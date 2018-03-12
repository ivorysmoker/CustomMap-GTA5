<?php 
	//Wir verwenden hier einen filter um gefährliche Zeichen wie < > umzuwandeln. 
	//Tut man dies nicht ist es möglich den PHP Code zu injecten.
	$content = filter_input(INPUT_POST, 'cContent', FILTER_SANITIZE_SPECIAL_CHARS);
	if($content)
	{
		
		//Ist der Code Valide? Oder befindet sich unangebrachtes im Code?
		
		
		//Ab hier müsste man sich sicher sein das kein Code exisitert der nicht dahin gehört! 
		$content = html_entity_decode($content);
		
		$handler = fopen("content.php", "w+");
		fwrite($handler, $content);
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