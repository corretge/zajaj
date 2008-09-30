/**
 * zajajHiXtory
 * 
 * M�dul per a poder seguir la hist�ria en una aplicaci� ZAJAJ
 *
 * Primera versi� molt senzilla i b�sica:
 *  - guardar hist�ria
 *  - moure's per la hist�ria
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
 * El contenidor de la Hist�ria
 */
var zHXContainer = new Object();

/**
 * El punter de la Hist�ria
 */
var zHXPunter = 0;

/**
 * La possici� m�xima del punter
 */
var zHXMax = 0;

/**
 * Definim una classe de tipus 
 * addre�a per a poder desar la info al
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
 * Funci� que envia la plana a una URL
 * passant-li o no un valor a POST.
 */
function zHXGoTo(url, post)
{
	/**
	 * Creem un objecte de tipus adre�a i el desem
	 * al contenidor de la Hist�ria.
	 */
	var lAddr = new zHXAddress(url, post);
	zHXContainer[zHXMax] = lAddr;
	
	/**
	 * incrementem el comptador i col�loquem el punter al final.
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
	 * Recuperem l'adre�a
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
 * Naveguem cap al seg�ent
 */
function zHXNext()
{
	if (zHXPunter < zHXMax)
	{
		zHXGoToPunter(zHXPunter + 1);
	}
}