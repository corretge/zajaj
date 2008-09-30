<?php
/**
 * Demo zajajHiXtory
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
	<script type="text/JavaScript" src="../jlib/zajajHiXtory.js"></script>
	<script>
		function jGetTime()
		{
			var d = new Date();
			return '(' + zHXPunter + '::' + zHXMax + ') ' + d.toUTCString();
		}
	</script>
</head>
<body>
<h1>Demo llibreria <a href="http://bloc.corretge.cat/2008/06/zajaj.html" target="_blank">zajajHiXtory</a></h1>
<p>

</p>
<div id="form">
<input type="button" onclick="zHXGoTo('testHiXtory.xtreme.php', jGetTime());" value="New">
<input type="button" onclick="zHXNext();" value="Next">
<input type="button" onclick="zHXPrev();" value="Prev">
</div>
<div id="result"></div>
</body>
</html>													