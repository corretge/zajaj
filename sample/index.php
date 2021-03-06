<?php
/**
 * Demo ZAJAJ
 * 
 * @author alex@corretge.cat
 */
header ('Content-type: text/html; charset=utf-8');
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
		 * Recuperem un text directament, i després enviem dades com a POST.
		 */
		document.getElementById('simple').innerHTML = zajajSimple('simple.html');
		document.getElementById('simple').innerHTML = zajajSimple('simple.php', "testPostData");
		
		/**
		 * Parsejem un ZAJAJ Extrem ;-)
		 */
		zajajXtreme(ztest.xtreme('Àlex Corretgé'));
		
		zajajXtreme(zajajSimple('test.xtreme.php', 'PimPamPum'));
	}
	</script>

</head>
<body>
<h1>Demo llibreria <a href="http://bloc.corretge.cat/2008/06/zajaj.html" target="_blank">ZAJAJ</a></h1>
<p>

</p>
<div id="form">
suma <input type="text" id="a"> + <input type="text" id="b">
<input type="button" onclick="zSum();" value="Calcular">
</div>
<div id="result"></div>
<div id="simple"></div>
<div id="xt"></div>
<div id="xt2"></div>
<div id="xt3"></div>
</body>
</html>												