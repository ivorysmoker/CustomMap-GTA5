$(document).ready( function() {
	
	
	
	//Inhalt von Markern...
	//$("#MarkerBox").html();
	
	//Inhalt von InfoBox...
	//$("#InfoBox").html();
	
	saveFunc = function()
	{
		$("#cContent").val($(".container").html());
		$("#SendForm").submit();
	}
	
});