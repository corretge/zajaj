<?php
/**
 * Classe demo ZAJAJ
 */

/**
 * Incorporem les funcions JSON del Zend Framework
 */
require_once ('Zend/Json.php');

/**
 * recuperem la interficie, no qualifiquem la path
 * doncs quan es carregui ja estarà a la de ZAJAJ
 */
require_once 'zajaj.interface.php';


/**
 * classe demo ZAJAJ
 *
 */
class zTest implements zajajRemote
{
	protected $microIn;
	protected $microFi;
	
	public function __construct()
	{
		$this->microIn = microtime();
	}
	
	public function __destruct()
	{
		$this->microFi = microtime();
	}
	
	public function suma($a, $b)
	{
		return $a + $b;
	}
	
	public function xtreme($lit)
	{
		$array = array('xt' => "Hola $lit",
							'oScript' => "alert('Hola $lit');");
		
		return Zend_Json::encode($array);
	}
}
?>