<?php
/**
 * Crea la interficie JavaScript per a la classe remota PHP
 * 
 * Based on PAJAX                                            
 * @link http://www.auberger.com/pajax
 * @package ZAJAJ
 * @author alex@corretge.cat
 */

class ZAJAJ
{
	protected $uriPath;
	protected $classPath;
	protected $dispatcher;
	
	public function __construct( $uriPath,
											$classPath,
											$dispatcher = "zajaj.dispatcher.code.php")
	{

		$this->uriPath = $uriPath;
		$this->classPath = rawurldecode($classPath);
		$this->dispatcher = $dispatcher;
	}
	
	public function loadClass($className)
	{
		/**
		 * Muntem el path per a recuperar l'arxiu que conté
		 * la classe a cridar.
		 */
		$classPath = "{$this->classPath}/{$className}.class.php";
		
		/**
		 * Debug purpose
		 *
		echo $classPath . "\n";
		echo getcwd() . "\n";
		/**/
		
		if (file_exists ($classPath)) 
		{
			/**
			 * Recuperem la classe i retornem 
			 * si existeix o no. 
			 */
			require_once($classPath);
			/**
			 * Aquí podem tornar true, si l'arxiu conté la classe
			 * que esperem o false si no és així.
			 */
			return class_exists($className);			
		}
		else
		{
			/**
			 * Si arribem aquí, vol dir que no l'ha pogut carregar
			 * així que retornem false com a error
			 */
			return false;
		}
	}
	
	public function isRemotable($className)
	{
		if (class_exists($className))
		{
			/**
			 * Si implementa la interficie zajajRemote vol
			 * dir que és una classe prevista per a ser
			 * cridada en entorn Ajax.
			 */
			$imp = class_implements($className);
			if (isset($imp['zajajRemote']))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			/**
			 * Si la classe no existeix, és evident que no és
			 * del tipus remotable.
			 */
			return false;
		}
	}
	
	public function renderJavaScriptStub($className, $listener=false)
	{
		
		if (! $this->isRemotable($className)) 
		{
			$err =  "ZAJAJ.class (". microtime() ."): Class $className is not remotable. Interface zajajRemote must be implemented.\n";
			/**
			 * Debug purpose
			 *
			error_log($err);
			/**/			
			return $err;
		}
		
		$jScript = "";
		/**
		 * recuperem els mètodes de la classe
		 */
		$classMethods = get_class_methods($className);
		
		/**
		 * Muntem la part de listener si és el cas
		 */
		$jScript .= <<< zajajScriptA
		
	function {$className}(listener) {
		this.__zajaj_object_id = "{$zajaj_object_id}" + __zajaj_get_next_id();
		this.__zajaj_listener = listener;		
		}
zajajScriptA;

		if ($listener)
		{
			$jScript .= <<< zajajScriptA2
	function {$className}(listener) {
		this.__zajaj_object_id = "{$zajaj_object_id}" + __zajaj_get_next_id();
		this.__zajaj_listener = listener;		
		}
		
	function {$className}Listener() { };
	
	{$className}Listener.prototype = new zajajListener();
	
zajajScriptA2;
		}
	/**
	 * Creem les funcions per a cada mètode de la classe.
	 */
	foreach ($classMethods as $methodName)
	{
		$ucMetode = ucfirst($methodName);
		/**
		 * Haurem de mirar de no crear el constructor ni el destructor
		 * que comencen per __
		 */
		if (substr($methodName, 0, 2) != '__')
		{
			if ($listener)
			{
				$jScript .= "{$className}Listener.prototype.on{$ucMetode} = function(result) { };\n";
			}
			
			$jScript .= <<< zajajScriptB
		
	{$className}.prototype.{$methodName} = function() 
	{
		if (arguments.length > 0 && typeof arguments[0] != 'undefined' )
		{
			params = new Array();
			for (var i = 0; i < arguments.length; i++) 
			{
				params[i] = arguments[i];
			}	
		}
		else
		{
			params = null;
		}
	
		var ret = new zajajConn("{$this->uriPath}{$this->dispatcher}").remoteCall(this.__zajaj_object_id, "{$this->classPath}", "{$className}", "{$methodName}", params, this.__zajaj_listener); 
		return ret;	
	}
	
zajajScriptB;
			
		}
	}
	
	return $jScript;
	
	}
}
?>