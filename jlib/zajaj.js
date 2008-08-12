/**
 * ZAJAJ
 * 
 * La base la tenim en una gran biblioteca anomenada PAJAX, però 
 * emprant les classes JSON oficials.
 * 
 * 
 * 
 * @see json2.js
 * @link http://auberger.com/pajax
 * @link http://bloc.corretge.cat/2008/06/zajaj.html
 * @license GNU General Public License v3 
 * @author alex@corretge.cat
 * @version 0.3
 */

var __zajaj_id_count = 0;

function __zajaj_get_next_id() {
	__zajaj_id_count++;
	return __zajaj_id_count;
}

 /**
  * Classe: zajajConn
  * Gestiona la comunicació entre el servidor i el client
  */
  
/**
 * Constructor: zajajConn
 * @param url
 */
function zajajConn(url)
{
	this.url = url	
}

/**
 * Si és un IE < 7 fem com si el navegador poguès executar
 * XMLHttpRequest.
 * 
 * @link http://code.google.com/p/zajaj/issues/detail?id=1
 * issue 1: Error using IE6
 */
if (!window.XMLHttpRequest)
{
	var jIE6 = true;
	window.XMLHttpRequest = function() { 
		return new ActiveXObject('Microsoft.XMLHTTP') 
	}
}
else
{
	var jIE6 = false;
}

/**
 * Mètode: sendSynch
 * invoquem el dispatcher a modus sincron
 * 
 * @param llista de parametres.
 * 
 * @return valor retornat per la classe remota
 */
zajajConn.prototype.sendSynch = function (request)
{
	/**
	 * Instanciem un HttpRequest
	 */
	var zHttp = new XMLHttpRequest();
	
	if (zHttp)
	{
		/**
		 * anulem onReadyStateChange
		 */
		zHttp.onreadystatechange = function() { };
		
		/**
		 * Establim la comunicació amb la url
		 */
		 try
		 {
		 	zHttp.open('POST', this.url, false);
		 }
		 catch(e) 
		 {
		 	throw "*ZER0202: Can't open this url: " + this.url;
		 }
		 
		 /**
		  * Enviem la sol·licitud
		  */
		 zHttp.setRequestHeader('Content-Type', 'text/json');
		 zHttp.send(JSON.stringify(request));
		 
		 var jResponse = zHttp.responseText;

		 return  JSON.parse(jResponse);
	}
	else
	{
		/**
		 * Si no hem pogut instanciar-ho retornem un error
		 */
		return "*ZER0201: Can't instantiate XmlHttpRequest()";
	}
}

/**
 * Mètode sendAsynch
 * Establim una comunicació asincrona
 */
zajajConn.prototype.sendAsynch = function (request, listener)
{

	/**
	 * Instanciem un HttpRequest
	 */
	var zHttp = new XMLHttpRequest();
	
	if (zHttp)
	{
		zHttp.onreadystatechange = function()
		{
			/**
			 * Si la comunicació és satisfactòria
			 */
			if (zHttp.readyState == 4 && zHttp.status == 200)
			{
				var result = JSON.stringify(zHttp.resposeText);
				
				/**
				 * Preparem la crida 
				 */
				if (request.method != null && request.method.length > 0) 
				{
					cbmethod = "on" + request.method.substring(0, 1).toUpperCase() + request.method.substring(1, request.method.length);
				}
				eval("listener." + cbmethod + "(result);");
			}
			
		zHttp.open("POST", this.url, true);
		zHttp.setRequestHeader('Content-Type','text/json');		
		listener.onBeforeCall();
		xmlhttp.send(JSON.stringify(request));
		listener.onAfterCall();
		return true;
					
		}
		
	}
	else
	{
		/**
		 * Si no hem pogut instanciar-ho retornem false
		 */
		return false;
	}
	
	
}

/**
 * Mètode remoteCall
 * establim la crida al mètode PHP en el servidor
 */
zajajConn.prototype.remoteCall = function (id, path, className, method, params, listener) {
	// Marshals the parameters for the remote invocation
	var request = new Object();
	request.id = id;
	request.className = className;
	request.method = method;
	request.params = params;
	request.path = path;
	
	if (listener) {
		return this.sendAsynch(request, listener);
	} else {
		return this.sendSynch(request);
	}
}

/*
	Class: zajajListener
	Base class for asynchronous callback listener
*/
/*
	Constructor: zajajListener
*/
function zajajListener() { };
/*
	Method: onBeforeCall
	Invoked before an asynchronous call takes place
*/
zajajListener.prototype.onBeforeCall = function() {};
/*
	Method: onAfterCall
	Invoked after an asynchronous call takes place
*/
zajajListener.prototype.onAfterCall = function() {};
/*
	Method: onError
	Invoked in case of error
*/
zajajListener.prototype.onError = function() {};


/**
 * Funció: zajajSimple
 * 
 * Fem una crida a una URL i retornem exactament el que 
 * generi.
 */
function zajajSimple(uri)
{
	/**
	 * Instanciem un HttpRequest
	 */
	var zHttp = new XMLHttpRequest();
	
	if (zHttp)
	{
		/**
		 * anulem onReadyStateChange
		 */
		zHttp.onreadystatechange = function() { };
		
		/**
		 * Establim la comunicació amb la url.
		 * 
		 * Fem que sigui sincrona, doncs ens esperarem a
		 * que finalitzi la comunicació per a gestionar 
		 * el resultat.
		 */
		 try
		 {
		 	zHttp.open('GET', uri, false);
		 }
		 catch(e) 
		 {
		 	throw "*ZER0202: Can't open this url: " + uri;
		 }
	
		 try
		 { 
		 	/**
		 	 * issue 2  - 12/08/2008
		 	 * Afegim null com a par�metre, doncs si no el FF3 casca.
		 	 */
		 	zHttp.send(null);
		 }
		 catch(e)
		 {
		 	throw "*ZER0203: Can't send data: " + e.message;
		 }

		 var jResponse = zHttp.responseText;
		 

		 return  jResponse;
	}
	else
	{
		/**
		 * Si no hem pogut instanciar-ho retornem un error
		 */
		return "*ZER0201: Can't instantiate XmlHttpRequest()";
	}
	
}
/**
 * Parsejem un resultat en JSON que ens arriba en format
 * array('id1' => 'html', 'idn' => 'html', 'oScript' => 'javaScript');
 *  
 * El processem i executem el contingut de oScript, i
 * col·loquem a cada id el text html que ens arriba.
 * 
 * Si el resultat comença per *ERR, el mostrarem i no farem rés.
 */
function zajajXtreme(resultJSON)
{
	/**
	 * Si és *ERR, el mostrem i sortim
	 */
	if (resultJSON.substring(0,4) == '*ERR')
	{
		alert(resultJSON);
		return;
	}

	/**
	 * Parsegem el resultat JSON
	 */
	var zajajAry = JSON.parse(resultJSON);
	
	/**
	 * Processem tota l'array.
	 */
	for ( var jnId in zajajAry)
	{
		/**
		 * si es tracta d'un script (oScript), l'executem
		 */
		if (jnId == 'oScript')
		{
			var oScript = document.createElement('script');
			oScript.text = zajajAry[jnId];
			oScript.type = 'text/javascript';
			document.body.appendChild(oScript);
		}
		else
		{
			/**
			 * Si no és un script, ho coloquem al id que toqui.
			 */
			try {
				document.getElementById(jnId).innerHTML = zajajAry[jnId];
			}
			catch(err)
			{
				alert('zajajXtreme: element id "' + jnId + '" missing.');
			}
		}
	}	
}