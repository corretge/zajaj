<?php

require_once ('Zend/Json.php');

/**
 * Esperem rebre els paràmetres per la capçalera POST pq així
 * ho decidim a l'exemple, però poden enviarse dins l'URL com 
 * a GET.
 */
if (isset($GLOBALS['HTTP_RAW_POST_DATA']))
{
	$lit = $GLOBALS['HTTP_RAW_POST_DATA'];
}
else
{
	$lit = 'Papet';
}

$array = array('xt2' => "Hola $lit modificat des de test.xtreme.php.",
					'oScript' => "	document.getElementById('xt3').innerHTML = 'Hola $lit ara afegit des de oScript a test.xtreme.php.';");
		
echo Zend_Json::encode($array);

?>