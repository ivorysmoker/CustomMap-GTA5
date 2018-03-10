<?php 
	/* Der Eventhandler submit() sendet das unten aufgeführte FORM per POST methode. */  
	if($_POST["cContent"])
	{
		//echo $_POST["bodyTestName"];
		//Da hier der gesamte Body content kommt der eingefühgt wurde ist hier zwingend notwendig gewisse Dinge zu prüfen
		//Wenn mann dies nicht macht kann easy eine Datei hochgeladen werden die alle Daten z.b löscht... (inject code)
		
		//Es ist zu prüfen ob es sich hier um validen Code handelt!
		
		
		//Speichern der Datei
		
		//Öffnet die Datei mit schreib und leserechten...
		
		//UNSAVE!!!!!!!!!!!
		$handler = fopen("content.php", "w+");
		fwrite($handler, $_POST["cContent"]);
		fclose($handler);
		//return;
	}
?>
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CustomMap (GTA5)</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="index.css">
	<!-- <script src="loading.js"></script> -->
	<script src="zoom.js"></script>
	<script src="setmarker.js"></script>
	<script src="userinput.js"></script>
	<script src="save.js"></script>
	<!-- script src='jquery.elevatezoom.js'></script-->
  </head>
  <body>
	<div class="menu" id="menu">	
		
		<?php 
			$maxButtons = 5;
			$pictureArray = ["gruen.png", "blau.png", "rot.png", "gelb.png", "delete.png"];
			$imagePath = "images/";
			
			for($x = 1; $x <= $maxButtons; $x++)
			{				
				echo '<img id="btn'.$x.'" alt="klickmich" class="menubuttons" src="'.$imagePath.''.$pictureArray[$x-1].'"> ';
			}
		?>
	
	</div>
	
	<div class="container">	
		<?php 
			include_once 'content.php';
		?>
	</div>
	<!-- 
	<div class="container">		
		<div id="maparea" class="maparea">	
			 	<div id="MarkerBox"></div>
				<div id="InfoBox"></div>
		</div>
	</div> 
	-->
	
	<!-- Marker Stuff -->
	
	<!-- Template to generate InfoBox content -->
	<div class="templateinfobox" style="visibility: hidden; display: none;">
		<div class="infoContainer" style="">
		
			<div class="strukturContainer" style="">
				<div class="infotitel" id="infotitel"></div>
				
				<div class="bildcontainer"></div>	
				
				<div class="infobeschreibung"></div>		
			</div>	
		</div>	
	</div>
	
	<div class="UserInputBox">
		<div class="UserInputBoxSettings">
			<form>
				<div class="form-group">
					<label for="markerInputTitle">Enter title</label>
					<input type="text" class="form-control" id="markerInputTitle" placeholder="Place here your title">
				</div>
				<div class="form-group">
					<label for="inputTextarea">Enter text</label>
					<textarea class="form-control" id="inputTextarea" rows="3" placeholder="Place here your text"></textarea>
				</div>
				<div class="form-group">
				
				<label for="imageCountSelection">Select picture count</label>
					<select class="form-control" id="imageCountSelection">
					  <option>1</option>
					  <option>2</option>
					  <option>3</option>
					  <option>4</option>
					  <option>5</option>
					</select>
				</div>
				
				<label for="linkInput">Enter picture link</label>
				<div id="InputLinkBox"></div>
				
				<input onclick="saveUserInputBoxToInfoBox();" class="btn btn-primary" value="Save">
			
			</form>
		</div>
	</div>
	
	<div class="werkzeugkiste" style="visibility: hidden;">
		<div class="werkzeugContainer">
			<div class="werkzeug1"></div>
			<div class="werkzeug2"></div>
		</div>
	</div>
	
	<div class="">
		<button type="button" onclick="saveFunc();">Speichere mich!</button>
		<form method="POST" id="SendForm">
			<input type="hidden" id="cContent" name="cContent">
		</form>
	</div>
  </body>
  </html>