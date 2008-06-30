<?php
/**
 * Executa la comunicació entre el client i el servidor.
 * 
 * Based on PAJAX                                            
 * @link http://www.auberger.com/pajax
 * @link http://bloc.corretge.cat/2008/06/zajaj.html
 * @license GNU General Public License v3
 * @package ZAJAJ
 * @author alex@corretge.cat
 * @version 0.3
 */

/**
 * Incorporem les funcions JSON del Zend Framework
 */
require_once ('Zend/Json.php');

/**
 * Recuperem la definció de la classe ZAJAJ
 */
require_once 'zajaj.class.php';

/**
 * Recuperem el que ens han passat a la
 * capçalera HTTP en mode POST
 */
if (isset($GLOBALS['HTTP_RAW_POST_DATA']))
{
	$input = $GLOBALS['HTTP_RAW_POST_DATA'];
}
else
{
	echo "*ERR ZAJAJ.dispatcher (". microtime() ."): Could not get POST data.\n";
	exit;
}

/**
 * Debug purpose
 *
error_log("ZAJAJ.dispatcher (" . microtime() . ") Input JSON: $input");
/**/

/**
 * Parsejem els paràmetres que ens arriba en modus JSON
 */
$invoke = Zend_Json::decode($input, Zend_Json::TYPE_ARRAY);

/**
 * Col·loquem els paràmetres
 */
$class = $invoke['className'];
$method = $invoke['method'];
$id = $invoke['id'];
$path = $invoke['path'];
$output = "null";
$obj = null;



/**
 * Instanciem la classe ZAJAJ
 */
$zajaj = new ZAJAJ("", $path);


/**
 * Debug purpose
 *
error_log("ZAJAJ.dispatcher (" . microtime() . ") Dispatching {$class}::{$method}.");
/**/


/**
 * Carreguem la definició de la classe
 */
if ($zajaj->loadClass($class))
{
	/**
	 * Establim la sessió aquí, un cop carregada la classe
	 * per així no ens generi un __PHP_Incomplete_Class
	 */
	@session_start();
	
	/**
	 * Declarem la col·lecció d'objectes a la sessió
	 */
	if (!session_is_registered('objects')) {
		$_SESSION['objects'] = array();
	} 

	/**
	 * Recuperem els nostres objectes de la sessió
	 */
	$objects = $_SESSION['objects'];

	/**
	 * Mirem si ja existeix aquest objecte a la sessió
	 */
	if (isset($objects[$id])) 
	{
		/**
		 * Debug purpose
		 *
		error_log("ZAJAJ.dispatcher (". microtime() ."): Restoring object from session.\n");
		/**/
		$obj = $objects[$id];
	} 
	else 
	{
		if ($zajaj->isRemotable($class)) 
		{
			/**
			 * Debug purpose
			 *
			error_log("ZAJAJ.dispatcher (". microtime() ."): Creating new object from class '{$class}'\n");
			/**/	
			
			eval("\$obj = new $class();");

			/**
			 * Debug purpose
			 *
			error_log("ZAJAJ.dispatcher (". microtime() ."): Created object from class '{$class}'\n");
			/**/	
			
		} 
		else 
		{
			/**
			 * Debug purpose
			 *
			error_log("ZAJAJ.dispatcher (". microtime() ."): Class '{$class}' not remotable.");
			/**/
			
			$obj = null;
		}
	}		
}
else
{
	$output = "*ERR ZAJAJ.dispatcher (". microtime() ."): Can't load class {$class}.\n";
	/**
	 * Debug purpose
	 *
	error_log($output);
	/**/
}

/**
 * Cridem el mètode de la classe que ens han demanat
 */
if (! is_null($obj) and is_object($obj))
{
	$args="";
	if ($invoke['params'] != null) {
		for ($i=0; $i<count($invoke['params']); $i++) {
			if ($i > 0) {
				$args = $args . ", ";
			}
			$args = $args . $invoke['params'][$i];
		}
	}

	/**
	 * Debug purpose
	 *
	error_log("ZAJAJ.dispatcher (". microtime() ."): Calling " . $class . "->" . $method . "(". $args . ")");
	/**/

	/**
	 * Invoquem el mètode amb els paràmetres
	 */
	$ret = call_user_func_array(array(&$obj, $method), $invoke['params']);
	
	/**
	 * Debug purpose
	 *
	error_log("ZAJAJ.dispatcher (". microtime() ."): Returned: " . $ret );
	/**/

	/**
	 * Formatem la sortida a JSON
	 */
	$output = Zend_Json::encode($ret);

	/**
	 * Debug purpose
	 *
	error_log("ZAJAJ.dispatcher (". microtime() ."): Output JSON: " . $output );
	/**/
	
	/**
	 * Desem l'objecte a la sessió
	 */
	$objects[$id] = $obj;
	$_SESSION['objects'] = $objects;
}
else
{
	$output = "*ERR ZAJAJ.dispatcher (". microtime() ."): Could not dispatch to valid object.\n";
	/**
	 * Debug purpose
	 *
	error_log($output);
	/**/
}

/**
 * Enviem el resultat d'executar el mètode
 */
header("Content-Type", "text/json");
print($output);
?>