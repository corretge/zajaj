/**
 * zajajHiXtory
 * 
 * Mòdul per a poder seguir la història en una aplicació ZAJAJ
 *
 * Primera versió molt senzilla i bàsica:
 *  - guardar història
 *  - moure's per la història
 *  - tot basat en zajajXtreme
 * 
 * @see zajaj.js
 * @link http://bloc.corretge.cat/2008/06/zajaj.html
 * @license GNU General Public License v3 
 * @author alex@corretge.cat
 * @version 0.1
 */
 
/**
 * Declarem algunes variables globals
 *
 * El contenidor de la Història
 */
var zHXContainer = new Object();

/**
 * El punter de la Història
 */
var zHXPunter = 0;

/**
 * La possició màxima del punter
 */
var zHXMax = 0;

/**
 * Definim una classe de tipus 
 * addreça per a poder desar la info al
 * contenidor i si cal anar afegint propietats,
 * ho fem a la classe.
 */
function zHXAddress(url, post)
{
	this.url = url;
	this.post = post;
}
zHXAddress.prototype.url;
zHXAddress.prototype.post;

/**
 * Funció que envia la plana a una URL
 * passant-li o no un valor a POST.
 */
function zHXGoTo(url, post)
{
	/**
	 * Creem un objecte de tipus adreça i el desem
	 * al contenidor de la Història.
	 */
	var lAddr = new zHXAddress(url, post);
	zHXContainer[zHXMax] = lAddr;
	
	/**
	 * incrementem el comptador i col·loquem el punter al final.
	 */ 
	zHXMax ++;
	zHXPunter= zHXMax;

	/**
	 * Recuperem la url amb el post que hem indicat
	 */	
	zajajXtreme(zajajSimple(url, post));
	
}

function zHXGoToPunter(punter)
{ 
	/**
	 * Recuperem l'adreça
	 */
	var lAddr =  zHXContainer[punter];
		
	if (lAddr != undefined)
	{
		/**
		 * Establim el punter si no hi ha cap error. 
		 */
		zHXPunter= punter;
			
		/**
		 * Recuperem la url amb el punter que ens ha arribat
		 */	
		zajajXtreme(zajajSimple(lAddr.url, lAddr.post));
	}
	
}

/**
 * Naveguem cap a l'anterior
 */
function zHXPrev()
{
	if (zHXPunter == zHXMax)
	{
		zHXGoToPunter(zHXPunter - 2);
	}
	else if (zHXPunter > 0)
	{
		zHXGoToPunter(zHXPunter - 1);
	}
}

/**
 * Naveguem cap al següent
 */
function zHXNext()
{
	if (zHXPunter < zHXMax)
	{
		zHXGoToPunter(zHXPunter + 1);
	}
}