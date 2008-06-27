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
 * @author alex@corretge.cat
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
 * Mètode: sendSynch
 * invoquem el dispatcher a modus sincron
 * 
 * @param
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
 * Class: zajajSimple
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
		 * Establim la comunicació amb la url
		 */
		 try
		 {
		 	zHttp.open('GET', uri);
		 }
		 catch(e) 
		 {
		 	throw "*ZER0202: Can't open this url: " + uri;
		 }
		 
		 zHttp.send();
		 
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
 