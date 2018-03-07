$(document).ready( function() 
{
	var textinput = "";
	var editMode = 1; //0 kann nicht editen ... 1 kann editen
	
	var linkID = 0;
	var imageCountSelection = 1;
	
	saveUserInputBoxToInfoBox = function()
	{
		if(markerID != null && editMode == 1)
		{
			var index = 0;
			$(".infotitel").each(function()
			{
				if(markerID == index)
				{
					//alert($("#markerInputTitle").val());
					$(this).text($("#markerInputTitle").val());
				}
				index++;
				if(markerID >= index){ return; }
			});
			index = 0;
			$(".infobeschreibung").each(function()
			{
				if(markerID == index)
				{
					$(this).text($("#inputTextarea").val());
				}
				index++;
				if(markerID >= index){ return; }
			});
			
			//Clear the Images
			$(".bildcontainer").eq(markerID).html("");
			
			//Build new Images
			var imageLeft = 0;
			$("#InputLinkBox input").each(function()
			{
				
					var imageTarget = $(this).val();
					
					//Baue das Bilder element
					var div = $("<div />", {
						class: "infobild",
						style: "left: "+imageLeft+"%"
					});
					
					var img = $("<img />", {
						src: ""+imageTarget+"",
						alt: "Unbekanntes Bild"
					});
					//Füge das Img hinzu..
					img.appendTo(div);
				
					div.appendTo($(".bildcontainer").eq(markerID));
					
					//Hat mich der Aboluten Position inhalb des cointers zutuhen...
					imageLeft += 33;
			});
			
		}		
	}
	
	loadUserInputBox = function()
	{
		var index = 0;
		$(".infotitel").each(function()
		{
			if(markerID == index)
			{		
				
				$("#markerInputTitle").val($(this).html());
			}
			index++;
			if(markerID >= index){ return; }
		});	
		
		index = 0;
		$(".infobeschreibung").each(function()
		{
			if(markerID == index)
			{		
			
				$("#inputTextarea").val($(this).html());
			}
			index++;
			if(markerID >= index){ return; }
		});	
	}
	
	$("#imageCountSelection").change(function(){
		
		imageCountSelection = $(this).val();
		
		generateInputLinkTags();
	});
	
	var generateInputLinkTags = function()
	{
		linkID = 0;
		$("#InputLinkBox").html("");
		
		for(var x = 0; x < imageCountSelection; x++)
		{
			var input = $('<input />', { 
				id: 'linkInput'+linkID+'', 
				class: 'form-control linkInputClass',
				placeholder: 'http://www.pic-upload.de/view/yourpicture.png'
			});
			input.appendTo($('#InputLinkBox'));	
				
			linkID++;
		}
	}
	
	generateInputLinkTags();
	
});