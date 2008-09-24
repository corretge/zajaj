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
function zajajSimple(uri, postData)
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
		 	if (postData != undefined)
		 	{
		 		zHttp.open('POST', uri, false);
		 		zHttp.send(postData);		 		
		 	}
		 	else
		 	{
		 		zHttp.open('GET', uri, false);
		 		zHttp.send(null);
		 	}
		 }
		 catch(e) 
		 {
		 	throw "*ZER0202: Can't open this url: " + uri;
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
function zajajXtreme(resultJSON, errorHandler)
{
	/**
	 * Si és *ERR, el mostrem i sortim
	 */
	if (resultJSON.substring(0,4) == '*ERR')
	{
		alert(resultJSON);
		/**
		 * si ens passen un control d'errors l'executem.
		 */
		if (errorHandler != undefined)
		{
			eval(errorHandler);
		}
		return;
	}

	/**
	 * Parsegem el resultat JSON i controlem que realment sigui una 
	 * cadena parsejable. En cas de que no ho sigui (generalment una
	 * petada del PHP) mostrem el text que s'havia de parsejar.
	 */
	try 
	{
		var zajajAry = JSON.parse(resultJSON);
	}
	catch(err)
	{
		alert(resultJSON);
		/**
		 * si ens passen un control d'errors l'executem.
		 */
		if (errorHandler != undefined)
		{
			eval(errorHandler);
		}
		
		return;
	}
	
	/**
	 * Definim l'scrip com a none per omissió
	 */
	var jHiHaScript = 'none';
	
	/**
	 * Processem tota l'array.
	 */
	for ( var jnId in zajajAry)
	{
		/**
		 * si es tracta d'un script (oScript), ho preparem tot
		 * i ho executarem després.
		 */
		if (jnId == 'oScript')
		{
			jHiHaScript = zajajAry[jnId];
		}
		else
		{
			/**
			 * Si no és un script, ho coloquem al id que toqui.
			 */
			
			try {
				var jInd = document.getElementById(jnId); 
				jInd.innerHTML = zajajAry[jnId];
			}
			catch(err)
			{
				alert('zajajXtreme: element id "' + jnId + '" missing.');
			}
		}
	}
	
	/**
	 * Si hi ha script a executar, és la darrera cosa que fem
	 * doncs molts cops es fa referència a elements que s'han carregat
	 * en altres divs.
	 */	
	 if (jHiHaScript != 'none')
	 {
	 		var oScript = document.createElement('script');
			oScript.text = jHiHaScript;
			oScript.type = 'text/javascript';
			document.body.appendChild(oScript);
	 	
	 }
}

/**
 * Retornem el contingut d'un formulari 
 * en una array JSON
 */
function zajajFSON(idForm)
{
	/**
	 * Definim l'objecte que contindrà els camps i els valors
	 * del formulari de tipus INPUT, TEXTAREA i SELECT
	 */
	var formulari = new Object();
	
	/**
	 * Recuperem el formulari que ens han passat.
	 * si no existís, ja està bé que peti
	 */
	var f = document.getElementById(idForm);
	
	/**
	 * Esbrinem quants elements hi ha al formulari
	 */
	var count = 0;
	var howMany = f.elements.length;
	
	/**
	 * Processem els elements del formulari
	 */ 
	for (count = 0; count < howMany; count++) 
	{ 
		/**
		 * Només necessitem els de tipus INPUT, TEXTAERA i SELECT ... de moment
		 */
		if (f.elements[count].tagName =='INPUT' || f.elements[count].tagName =='TEXTAREA' || f.elements[count].tagName =='SELECT') {
			/**
			 * En el cas dels checkbox hem de recuperar el valor només si és checked.
			 */	
			if (f.elements[count].type == 'checkbox')
			{
				if (f.elements[count].checked) {
					formulari[f.elements[count].name] = f.elements[count].value;
				}
			}
			/**
			 * Per a la resta obtindrem la propietat value
			 */
			else
			{
				formulari[f.elements[count].name] = f.elements[count].value;
			}
		}
	}


	/**
	 * Passem l'objecte a JSON per a que es pugui tractar com una
	 * Array Associativa des de PHP o altres llenguatges.
	 */
	var ser = JSON.stringify(formulari);
	return ser;			}