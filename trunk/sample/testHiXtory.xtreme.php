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

$lit .= " (" . date("d-m-Y H:i:s") . ")";

$array = array(	'result' => $lit);

echo Zend_Json::encode($array);

?>