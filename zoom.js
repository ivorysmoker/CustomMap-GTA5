$(document).ready( function() {

        currentZoomLevel = 0; // deklarierung einer Globalen Variable!

        scaleRatio = 1.2;
        scaleDownRatio = 5/6;

        //var windowWidth = $(window).width();
        //var windowHeight = $(window).height();
        //Set the default map width to window.size
        //$("#maparea").width(windowWidth);
        //$("#maparea").height(windowHeight);

        //Set resize function...
        /*$(window).resize(function(){
            windowWidth = $(window).width();
            windowHeight = $(window).height();
        });*/

		var HideInfoBox = function()
		{
			$('#InfoBox .infoContainer').each(function(){
				//alert($(this).attr("class"));
				$(this).css("visibility", "hidden");

			});
		}
		
        //Set the current mapWidth/Height
        var mapWidth = $("#maparea").width();
        var mapHeight = $("#maparea").height();

        //Es gibt verschiedene möglichkeiten um eigene funktionen zu deklarieren in JQuery sowie JS.
        var markersScallingUp = function()
        {
            $("#MarkerBox img").each(function(){
                //$(this).css("transform", "scale(" + scaleMarkers+ ")" );
                //$(this).css("transform", "scale(" + scaleRatio * (currentZoomLevel + 1)+ ")" );
                $(this).css("transform", "scale(" + scaleDownRatio / (currentZoomLevel + 1)+ ")" );

                //$(this).css("top", $(this).offset().top * 1.2);
                //$(this).css("left", $(this).offset().left * 1.2);
            });
        }

        var markersScallingDown = function()
        {
            $("#MarkerBox img").each(function(){
                //$(this).css("transform", "scale(" + scaleDownRatio / (currentZoomLevel + 1)+ ")" );

                $(this).css("transform", "scale(" + scaleDownRatio / (currentZoomLevel)+ ")" );

                //$(this).css("top", $(this).offset().top / 1.2);
                //$(this).css("left", $(this).offset().left / 1.2);
            });
        }


        var infoScallingUp = function()
        {
            $("#InfoBox .strukturContainer").each(function(){
				$(this).css("transform", "scale(" + scaleDownRatio / (currentZoomLevel + 1)+ ")" );
            });
			
        }

        var infoScallingDown = function()
        {
            $("#InfoBox .strukturContainer").each(function(){
				$(this).css("transform", "scale(" + scaleDownRatio / (currentZoomLevel)+ ")" );
            });
        }


        $(document).keydown(function(e){


            switch(e.which)
            {
                case 107:   
                    
                    if(currentZoomLevel <= 8){

                        $("#maparea").focus();    
                        //$("#map").width(mapWidth * 1.2);
                        //$("#map").height(mapHeight * 1.2);    
                        //scaleMap *= 1.2 * (currentZoomLevel + 1)
                        //scaleMarkers /= 1.2 * (currentZoomLevel + 1)
                        $("#maparea").css("transform", "scale(" + scaleRatio * (currentZoomLevel + 1)+ ")");

                        //alert(differenceX);
                        //alert(differenceX);
                        markersScallingUp();
                        infoScallingUp();
                        //mapWidth = $("#mapareaid").width();
                        //mapHeight = $("#mapareaid").height(); 

                        //$(window).scrollTop($(window).scrollTop()+100);
                        //$(window).scrollLeft($(window).scrollLeft()+(60 * currentZoomLevel));
                        currentZoomLevel++;
						
						
						HideInfoBox();
						
                    }
                break;

                case 109:   
                    if(currentZoomLevel >= 1){
                        $("#maparea").focus();
                        //$("#mapareaid").css("width", mapWidth / 1.2);
                        //$("#mapareaid").css("height", mapHeight / 1.2);
                        //$("#map").width(mapWidth / 1.2);
                        //$("#map").height(mapHeight / 1.2);    
                        //mapWidth = $("#mapareaid").width();
                        //mapHeight = $("#mapareaid").height(); 

                        //scaleMap /= 1.2 * (currentZoomLevel + 1)
                        //scaleMarkers *= 1.2 * (currentZoomLevel + 1)
						if(currentZoomLevel == 1)
						{
							$("#maparea").css("transform", "scale(1)" );
						}else{
							$("#maparea").css("transform", "scale(" + scaleRatio * (currentZoomLevel)+ ")" );
						}

                        markersScallingDown();
                        infoScallingDown();
                        //$(window).scrollTop($(window).scrollTop()-100);
                        //$(window).scrollLeft($(window).scrollLeft()-(60 * currentZoomLevel));
                        currentZoomLevel--;
						
						HideInfoBox();
						
                    }
                break;
            }           
        });

    });