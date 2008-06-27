<?php
/**
 * Classe demo ZAJAJ
 */

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
}
?>