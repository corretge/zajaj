<?php
/**
 * Demo ZAJAJ
 * 
 * @author alex@corretge.cat
 */
header ('Content-type: text/html; charset=utf-8');

require_once 'Zend/Json.php';

$head = <<< htmlHEAD
<html>
<head>
	<meta content="text/html; utf-8" http-equiv="Content-Type">
	<title>ZAJAJ Demo</title>
	<script type="text/JavaScript" src="../jlib/json2min.js"></script>
	<script type="text/JavaScript" src="../jlib/zajaj.js"></script>
	
	<style type="text/css">

	body {
	background-color:white;
	font-family:'Trebuchet MS',helvetica,arial,sans-serif;
	font-size:10pt;
	margin:0 auto;
	text-align:center;
	width:998px;
	}

	#cap {
	float:left;
	min-height:120px;
	padding-right:8px;
	text-align:left;
	width:865px;
	background-color:	#93B7D1;
	}
	
	#main {
	float:left;
	
	overflow:auto;
	
	text-align:left;
	width:698px;
	background-color:		#72D1DD;
	min-height:480px;
	}
	
	#menu {
	border-left:1px solid darkred;
	float:left;
	min-height:480px;
	padding-left:4px;
	padding-right:4px;
	text-align:left;
	width:166px;
	background-color:#FC8C99;
	}
	
	#widgets {
	border-left:1px solid darkred;
	float:right;
	max-width:120px;
	min-height:600px;
	padding-left:4px;
	text-align:left;
	width:120px;
	background-color:	#E0EA68;
	}

	#form {
	margin-top: 20px;
	margin-left: 10px;
	min-height:200px;
	width:400px;
	background-color:	#AADD96;
	}	
	
	#codi {
	background-color:	white;
	font-family: 'Lucida Console';
	font-size: 10pt;
	}
	</style>
</head>
htmlHEAD;

$ary = array('cap' => 'Exemple utilització JSON', 'form' => 'Prova de text!', 'oScript' => "alert('test JSON zajajXtreme');");
$resultJSON = Zend_Json::encode($ary);
$codi = "";
ob_start();
var_dump($ary);

$codi = "zajajXtreme('{$resultJSON}');";

$codi = '{"docw_codi":"","docw_literal":"%Corre%","bpwcqry_ANDOR":" AND ","bpwcqry_ORDERBY":"docw_codi"}';
//$codi = ob_get_contents();
ob_end_clean();

$body = <<< htmlBODY
<body>
<div id="cap">CAPÇALERA (#cap)</div>
<div id="widgets">WIDGET (#widgets)</div>
<div id="menu">MENÚ (#menu)
</div>
<div id="main">PRINCIPAL (#main)
<div id="form">FORMULARI (#form) </div>
<div id="codi"><pre>$codi</pre></div>
</div>
<script>
var resultJSON = zajajSimple('testJSON.simple.php');
zajajXtreme(resultJSON);
</script>
</body>
</html>				
htmlBODY;

echo $head;
echo $body;
?>