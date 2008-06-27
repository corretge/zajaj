<?php
/**
 * Demo ZAJAJ
 */
?>
<html>
<head>
	<meta content="text/html; utf-8" http-equiv="Content-Type">
	<title>ZAJAJ Demo</title>
	<script type="text/JavaScript" src="../jlib/json2min.js"></script>
	<script type="text/JavaScript" src="../jlib/zajaj.js"></script>
	<script type="text/JavaScript" src="../zajaj.import.code.php?class=zTest&path=<?php echo rawurlencode(dirname(__FILE__)); ?>"></script>
	
	
	<script type="text/javascript">
	var ztest = new zTest();
	
	function zSum()
	{
		var a = document.getElementById('a').value;
		var b = document.getElementById('b').value;
		
		/**
		 * Fem la suma via ZAJAJ
		 */
		document.getElementById('result').innerHTML = ztest.suma(a,b);
		
		/**
		 * Recuperem un text directament
		 */
		document.getElementById('simple').innerHTML = zajajSimple('simple.html');
	}
	</script>

</head>
<body>
<div id="form">
suma <input type="text" id="a"> + <input type="text" id="b">
<input type="button" onclick="zSum();" value="Calcular">
</div>
<div id="result"></div>
<div id="simple"></div>
</body>
</html>												