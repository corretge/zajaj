<?php
require_once 'Zend/Json.php';

$ary = array('cap' => 'Exemple utilització JSON', 'form' => 'Prova de text!', 'oScript' => "alert('test JSON zajajXtreme');");
$resultJSON = Zend_Json::encode($ary);

echo $resultJSON;
?>