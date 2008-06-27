<?php
/**
 * Classe demo ZAJAJ
 * 
 * @author alex@corretge.cat
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
	
	/**
	 * Constructora de la classe
	 */
	public function __construct()
	{
		$this->microIn = microtime();
	}
	
	/**
	 * Destructora de la classe
	 *
	 */
	public function __destruct()
	{
		$this->microFi = microtime();
	}
	
	/**
	 * Calculem la suma dels dos paràmetres
	 *
	 * @param integer $a
	 * @param integer $b
	 * @return string
	 */
	public function suma($a, $b)
	{
		return $a + $b;
	}
	
	/**
	 * Pasem el literal que ens arriba a una id html
	 * i preparem un script que s'ha d'executar.
	 *
	 * @param string $lit
	 * @return JSON
	 */
	public function xtreme($lit)
	{
		$array = array('xt' => "Hola $lit",
							'oScript' => "alert('Hola $lit');");
		
		return Zend_Json::encode($array);
	}
}
?>