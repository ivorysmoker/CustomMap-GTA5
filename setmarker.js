$(document).ready( function() {

    
	markerID = null;
    currentSelection = 0;
	
    var pictureArray = ["default.png", "gruen.png", "blau.png", "rot.png", "gelb.png"];
    var currentMousePos = { x: -1, y: -1 };
	var halfMarkerSize = 15;
    var currentScrollPos = 0;
    var markerCountID = 0;    

    var x = -1;
    var y = -1;
	
	var xPerc = 0;
	var yPerc = 0;
	
	//Inizialsiere Dokumenten Breite und Höhe
	var documentHeight = $(document).height() - $(window).height();
	var documentWidth = $(document).width() - $(window).width();
	
    var markerBindClick = function()
    {       
        $("#MarkerBox img").each(function(){
            $(this).off("mousedown").on("mousedown", function(e){
                switch(e.which)
                {
                    case 1:
                        //Left Mouse button pressed.
                        x = currentMousePos.x + 15;
                        y = currentMousePos.y - 5;

                        markerID = e.target.id.replace('Marker_', '');  
						
						if(currentSelection != 5)
						{
							HideInfoBox();
							ShowInfoBox();	
							loadUserInputBox();		
						}                        
                        break;
                    case 2:
                        //Middle Mouse button pressed.;
                        break;
                    case 3:
						//HideInfoBox();
                        //Right Mouse button pressed.
                        break;
                }
            }); 
        });
    }

    var HideInfoBox = function()
    {
        $('#InfoBox .infoContainer').each(function(){
            //alert($(this).attr("class"));
            $(this).css("visibility", "hidden");
          
        });
    }

    var truncateDecimals = function (number, digits) 
	{
        var multiplier = Math.pow(10, digits),
            adjustedNum = number * multiplier,
            truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

        return truncatedNum / multiplier;
    };


	
    var ShowInfoBox = function()
    {  	
		var coordsInfoBox = 0;
		var position = 0;
		
		//Loop all MarkerBox elements
		var markerCount = 0;
		$('#MarkerBox img').each(function(){
			
			if(markerCount == markerID)
			{
				var s = '[description:"aoeu" uuid:"123sth"]';
			
				/* getPosition....
				var rgx = /\d{1,2}\.\d+|\([0-9A-z]+\)/g;
				coordsInfoBox = $(this).attr('style').toString().match(rgx);
				*/
				position = $(this).position();
			
				if(coordsInfoBox[2] == "(Infinity)")
				{
					coordsInfoBox[2] = "Infinity";
				}
			}
			markerCount++;
		});		
		
		var count = 0;
        $('#InfoBox .infoContainer').each(function(){           
            if(markerID == count)
            {
                $(this).css("visibility", "visible");
				
				var dynamicWidth = $('#maparea').width() * (scaleRatio * currentZoomLevel);
				var dynamicHeight = $('#maparea').height() * (scaleRatio * currentZoomLevel);
				
				if(dynamicWidth == 0 || dynamicHeight == 0)
				{
					dynamicWidth = $("#maparea").width();
					dynamicHeight = $('#maparea').height();
				}
				var xPerc = x / dynamicWidth * 100;
				var yPerc = y / dynamicHeight * 100;
				
				$(this).css("top", ""+yPerc+"%");
				$(this).css("left", ""+xPerc+"%");
				$(this).css("position", "absolute");
            }
            count++;
            if(markerID >= count){ return; }            
        });	
		
    }	
	
	var DeleteMarker = function()
	{
		var markerCount = 0
		$('#MarkerBox img').each(function(){
			
			if(markerCount == markerID)
			{ 
				$(this).remove();	
			}
			markerCount++;
		});	

		var count = 0;
		$('#InfoBox .infoContainer').each(function()
		{           
			if(markerID == count)
			{
				$(this).remove();
			}
			count++;
		
			if(markerID >= count){ return; }            
		});	

		//Bringe die Reihefolge von den Markers wieder in Ordnung! von 0 Aufwerts...
		SortMarkerID();
	}
	
	var SortMarkerID = function()
	{
		
		var newID = 0;
		$('#MarkerBox img').each(function(){
			//Setze eine neue ID
			$(this).attr("id", "Marker_" + newID);	
			newID++;
		});			
		markerCountID = newID;	
	}
	
    //Loading directly...
    $("#menu img").each(function(){      
        $(this).on("click", function(){
			
            if($(this).attr("id") == "btn1")
            {
                currentSelection = 1;
            }else if($(this).attr("id") == "btn2")
            {
                currentSelection = 2;
            }else if($(this).attr("id") == "btn3")
            {
                currentSelection = 3;
            }else if($(this).attr("id") == "btn4")
            {
                currentSelection = 4;
            }
			else if($(this).attr("id") == "btn5")
            {
                currentSelection = 5;				
            }
        });
    });

	//Bei Mausbewegung aktuelle Position neu setzen
    $("#maparea").on( "mousemove", function( e ) {
		currentMousePos.x = e.clientX + $(window).scrollLeft();
		currentMousePos.y = e.clientY + $(window).scrollTop();
    });
	
	$("#maparea").click(function(e){

        if(currentSelection != 0 && currentSelection != 5)
        {
			if(currentZoomLevel != 0)
			{
				x = currentMousePos.x - (halfMarkerSize * (currentZoomLevel * scaleRatio));
				y = currentMousePos.y - (halfMarkerSize * (currentZoomLevel * scaleRatio));
			}
			else
			{
				x = currentMousePos.x - (halfMarkerSize );
				y = currentMousePos.y - (halfMarkerSize );
			}   
			
			var dynamicWidth = $('#maparea').width() * (scaleRatio * currentZoomLevel);
			var dynamicHeight = $('#maparea').height() * (scaleRatio * currentZoomLevel);
			
            if(dynamicWidth == 0 || dynamicHeight == 0)
			{
				dynamicWidth = $("#maparea").width();
				dynamicHeight = $('#maparea').height();
			}
			xPerc = x / dynamicWidth * 100;
            yPerc = y / dynamicHeight * 100;
	
            var img = $('<img />', { 
            id: 'Marker_'+markerCountID+'',
            src: 'images/'+pictureArray[currentSelection]+'',
            alt: 'Map Marker',
            style: 'top: '+truncateDecimals(yPerc,3)+'%;'+' left: '+truncateDecimals(xPerc,3)+'%; position: absolute; transform: scale('+scaleDownRatio / currentZoomLevel+');'
            });
            img.appendTo($('#MarkerBox'));
            markerCountID++;
            currentSelection = 0;
            markerBindClick();
			
			//Ändere kurzzeitig das template...
			$('.templateinfobox .strukturContainer').css("transform", "scale("+scaleDownRatio / currentZoomLevel+")");
			//Füge das Template Hinzu
            $('#InfoBox').append($('.templateinfobox').html()); 
			//Dazugehörige Eventhandler..
			
			//bindOnInfotitelMousedown();
			//saveUserInputBoxToInfoBox();
			
			//Template wird zum standart zurück gesetzt.
			$('.templateinfobox .strukturContainer').css("transform", "");
			

			//Aufgabe 1
			//Dem strukturContainer muss hier falls derzeit gezoomt ist den momentanen scale mitgeteilt werden. 
			//In unserem Template würde das dan bei Ladebegin so aussehen: <div class="strukturContainer" style="transform: scale(currentScaleInformation)">
        }
		else if(currentSelection == 5)
		{
			DeleteMarker();
			currentSelection = 0;
		}

        if(currentSelection == 0)
        {
           // HideInfoBox();
        }   	
    });
	
});