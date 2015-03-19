## La part del servidor ##
La classe que volem que sigui interaccionada des de JavaScript haurà d'implementar la interficie **zajajRemote**.

Aquest únic requeriment és per una qüestió de seguretat, d'aquesta manera garantim que ZAJAJ només instanciarà classes que hem decidit que puguin ser instanciades.

La manera de fer-ho és així de senzilla:

```
**
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
```

ZAJAJ només implementa els mètodes que no comencin per _subratllat_ així que el constructor i el destructor de la classe no s'implementaran.

## La part del client ##

Per a que una plana web pugui cridar els mètodes de les classes amb interficie zajajRemote, cal afegir tres scripts:
```
<head>
	<meta content="text/html; utf-8" http-equiv="Content-Type">
	<title>ZAJAJ Demo</title>
	<script type="text/JavaScript" src="../jlib/json2min.js"></script>
	<script type="text/JavaScript" src="../jlib/zajaj.js"></script>
	<script type="text/JavaScript" src="../zajaj.import.code.php?class=zTest&path=<?php echo rawurlencode(dirname(__FILE__)); ?>"></script>
	
	
	<script type="text/javascript">
	var ztest = new zTest();
	
	function zSum()
	{
		var a = document.getElementById('a').value;
		var b = document.getElementById('b').value;
		
		/**
		 * Fem la suma via ZAJAJ
		 */
		document.getElementById('result').innerHTML = ztest.suma(a,b);
		
		/**
		 * Recuperem un text directament
		 */
		document.getElementById('simple').innerHTML = zajajSimple('simple.html');
	}
	</script>

</head>
<body>
<div id="form">
suma <input type="text" id="a"> + <input type="text" id="b">
<input type="button" onclick="zSum();" value="Calcular">
</div>
<div id="result"></div>
<div id="simple"></div>
</body>
```

**json2min.js** és una versió minimitzada de les funcions d'interpretació JSON. Aquest paquet també distribueix una versió més humana, la json2.js que es pot emprar en entorns de depuració.

**zajaj.js** conté les classes genèriques de ZAJAJ necessaries per a la comunicació entre client i servidor.

**zajaj.import.code.php** _importa_ els mètodes de la classe indicada en el paràmetre **class** situada a la carpeta indicada pel paràmetre **path**. Import code, generarà tants mètodes com tingui la classe amb interficie zajajRemote. Ha d'existir al path indicat un arxiu amb nom **class**.class.php que contingui una classe anomenada **class**. Les lletres de capsa alta i baixa són significatives.

Per a poder emprar aquest objecte creat per zajaj.import.code.php, caldrà instanciar-ho, així que ho farem al principi de tot. En el nostre exemple:
`var ztest = new zTest();`

Aquestes senzilles pases, ens permetrà emprar el mètode suma amb aquesta senzillesa:
`var jSuma = ztest.suma(5,8);`
i jSuma contindrà el valor retornat pel mètode PHP suma.