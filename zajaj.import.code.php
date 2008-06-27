<?php
/**
 * Crea la interficie JavaScript per a la classe remota PHP
 * 
 * Based on PAJAX                                            
 * @link http://www.auberger.com/pajax
 * @package ZAJAJ
 * @author alex@corretge.cat
 */

/**
 * Recuperem la classe ZAJAJ
 */
require_once 'zajaj.class.php';

/**
 * Informem la capçalera HTTP que servirem javascript.
 * La codificació no cal especificar-la, doncs tenim
 * els programes i el servidor a UTF-8
 */
header('Content-Type: text/javascript');

/**
 * Creem una instància de ZAJAJ passant-li la posició on es troba la llibreria
 * ZAJAJ dins la URL
 */
$uri = substr($_SERVER['REQUEST_URI'], 0, strrpos($_SERVER['REQUEST_URI'], "/")+1);
/**
 * i ara col·loquem el path, relatiu a on tenim la llibreria zajaj
 */
if (isset($_REQUEST['path']) and $_REQUEST['path'] != "")
{
	$path = $_REQUEST['path'];
}
else
{
		$err = "ZAJAJ.import (". microtime() ."): Can't load class {$_REQUEST['class']}.\n";
		/**
		 * Debug purpose
		 *
		error_log($err);
		/**/
		echo $err;
		exit;
}

/**
 * Indiquem si cal fer servir la part asincrona
 */
$listen = (isset($_REQUEST['listen']) and $_REQUEST['listen'] != "");

$zajaj = new ZAJAJ($uri, $path);

/**
 * La classe que s'ha d'importar és la que ens envien
 * amb el paràmetre class
 */
if (isset($_REQUEST['class']) and $_REQUEST['class'] != "")
{
	/**
	 * Si podem carregar la classe, generem el JavaScript
	 * corresponent
	 */
	if ($zajaj->loadClass($_REQUEST['class']))
	{
		echo $zajaj->renderJavaScriptStub($_REQUEST['class'], $listen);
	}
	else
	{
		$err = "ZAJAJ.import (". microtime() ."): Can't load class {$_REQUEST['class']}.\n";
		/**
		 * Debug purpose
		 *
		error_log($err);
		/**/
		echo $err;
	}
	
}
else
{
	/**
	 * Si no ens indiquen cap classe a importar, retornarem error.
	 */
	$err = "ZAJAJ.import (". microtime() ."): parameter 'class' not declared on url {$_SERVER['REQUEST_URI']} .\n";
	/**
	 * Debug purpose
	 *
	error_log($err);
	/**/
	echo $err;
}

?>