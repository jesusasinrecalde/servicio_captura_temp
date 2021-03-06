

var tabla_valores;
var actualizar_datos; // flag para indicar si hay datos modificados o no
var timer_actualizar_datos; // temporizador utilizado para realizar el parpadeo en el caso que actualizar_datos sea true
var Tem1;
var tabla_objetos;
var tabla_datos_tres_horas;
var timer_interval_modo;
var timer_interval_lectura_datos;
var IdObjetoGlobal; // variable usada para pasar el IdObjeto atraves de funciones callback
var NumeroErroresFaldon;
var g_key;
var g_device;

window.onload = function() {
	
	
	InicializaVisError();
	 $("#loading").addClass('hide');
	g_key=localStorage["hjm_key"];
	g_device=localStorage["hjm_device"];
	if(g_key==null || g_device==null)
	{
		
		$('#login-modal').modal('show');$('#login-modal').modal('show');
	}
	else
	{
		// peticion al usuario de permiso para permitir el uso de notificaciones
		if( Notification.permission === 'default' ) {
				Notification.requestPermission(function(permission) {
				// callback
														if( permission === 'granted' ) {
															console.log("Permiso para usar notificaciones");
														}
												});
		}
		
		
		
		LanzamientoHejmo();
	}

}



function LanzamientoHejmo()
{
	
	$('#login-modal').modal('hide');
	$('#menu_logout').show();
	$('#menu_login').hide();
	$('#actualizar_dat').show();
	debugger;
	
	g_key=localStorage["hjm_key"];
	g_device=localStorage["hjm_device"];
	
	if(tabla_objetos==null)
	{
		tabla_valores = new Array();
		tabla_objetos = new Array();
		tabla_datos_tres_horas = new Array();
		
	}
	
	if(tabla_objetos.length)
	{
		if(timer_interval_lectura_datos)
			clearInterval(timer_interval_lectura_datos);
		if(timer_interval_modo)
			clearInterval();
		
		for (x=0;x<tabla_objetos.length;x++)
		{timer_interval_modo
			console.log("Destruye objeto ["+x+"]\n");
			tabla_objetos[x].DestruyeObjetoGrafico();
		}
		
		tabla_valores.lenght=0;
		tabla_objetos.lenght=0;
		tabla_datos_tres_horas.lenght=0;
	}
	
	actualizar_datos = false;
	timer_interval_modo=null;
	timer_interval_lectura_datos=false;
	llamarServicioCarriotsPrimeravez();
	
	
}

/** Crear estructura termostato de tipo sistena ( 0 )
*/
function crearTermostatoTipo0( id_term)
{
	var termostato1= new Object();
	
	
	termostato1.parametros={temperatura:35.5, modo:0,temperaturaAmbiente:30.5,ValvulaAbierta:0};// datos recibidor del termostato
	termostato1.configuracion={temperatura:35.5, modo:0, Caption:""};// parametros que se envian al termostato 
	termostato1.configuracion.Caption="Termostato "+id_term;
	termostato1.iluminadoModo=false;
	termostato1.Tipo=0;// tipo de objeto en este caso termostato sistena
	termostato1.Caption="Termostato "+id_term;
	termostato1.visible=1;// se mira si es visible o no 
	termostato1.EstaMinimizado=1; // 0 maximizado, 1 minimizado
	//termostato1.temperatura=35.5;
	//termostato1.temperaturaAmbiente=30.5;
	termostato1.estado=1; // donde 1 es on y 0 off 
	termostato1.actualizar=0; // donde 1 es que hay que enviar datos al servicio pass , 0 no hay datos actualizador
	termostato1.dat=0;// ????
	//termostato.HayDatosCambiados=HayDatosCambiados_Term;

	tabla_valores.push(termostato1);

	var t = document.querySelector('#termostato_tipo_1');
	
	
	var clone = document.importNode(t.content, true);
	
	clone.getElementById("termostato").id="termostato"+id_term;
	clone.getElementById("marco_superior").id="marco_superior"+id_term;
	clone.getElementById("icono_despliegue").id="icono_despliegue"+id_term;
	clone.getElementById("caption_temp").id="caption_temp"+id_term;
	clone.getElementById("tempAmbiente").id="tempAmbiente"+id_term;
	clone.getElementById("icono_OnOffSup").id="icono_OnOffSup"+id_term;
	clone.getElementById("marco_inf").id="marco_inf"+id_term;
	clone.getElementById("zona_iconos").id="zona_iconos"+id_term;
	clone.getElementById("btn_mas").id="btn_mas"+id_term;
	clone.getElementById("icono_func_mas").id="icono_func_mas"+id_term;
	clone.getElementById("temp_grande").id="temp_grande"+id_term;
	clone.getElementById("btn_menos").id="btn_menos"+id_term;
	clone.getElementById("icono_func_menos").id="icono_func_menos"+id_term;
	clone.getElementById("icono_onoff").id="icono_onoff"+id_term;
	clone.getElementById("btn_onoff").id="btn_onoff"+id_term;
	clone.getElementById("marco_temp").id="marco_temp"+id_term;
	clone.getElementById("btn_conf").id="btn_conf"+id_term;
	clone.getElementById("temp_peque").id="temp_peque"+id_term;
	clone.getElementById("term_modo").id="term_modo"+id_term;
	
	
	$("#contenedor").append(clone);
	document.getElementById("icono_despliegue"+id_term).setAttribute( "IdTerm",id_term.toString());
	document.getElementById("icono_OnOffSup"+id_term).setAttribute("IdTerm",id_term.toString());
	document.getElementById("btn_mas"+id_term).setAttribute("IdTerm",id_term.toString());
	document.getElementById("btn_menos"+id_term).setAttribute("IdTerm",id_term.toString());
	document.getElementById("btn_onoff"+id_term).setAttribute("IdTerm",id_term.toString());
	document.getElementById("btn_conf"+id_term).setAttribute("IdTerm",id_term.toString());
	
}

function BtnDesplegar( obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var data = tabla_valores[id_term];
	$('#icono_desplegar'+id_term).fadeOut(100);
	$('#icono_desplegar'+id_term).fadeIn(100);


	if(data.EstaMinimizado==1)// si esta minimizado ...
	{
		data.EstaMinimizado=0;// ... se maximiza
		
	}
	else
	{
		data.EstaMinimizado=1;
		
	}
	Desplegar(id_term,0);
			
}

function BtnSubirTemp( obj )
{
	
	var id_ter=parseInt(obj.getAttribute('IdTerm'));
	var temp_peque = document.getElementById('temp_peque'+id_ter);
	$('#icono_func_mas'+id_ter).fadeOut(100);
	$('#icono_func_mas'+id_ter).fadeIn(100);
	var data = tabla_valores[id_ter];
	data.configuracion.temperatura+=0.5;
	
	var elem1=document.getElementById('temp_grande'+id_ter);
    elem1.innerHTML=data.configuracion.temperatura+"�";

	if(data.configuracion.temperatura!=data.parametros.temperatura)
	{
		temp_peque.style.visibility='visible';
		if(timer_interval_modo==null)	
		{
					// se crea el temporizador parar destacar el cambio de modo
			timer_interval_modo=setInterval(func_inteval_modo,1000);
		}
	}
	else
	{
		temp_peque.style.visibility='hidden';
		$( '#temp_grande'+x ).fadeTo( 'slow',1 ); // rescatamos el aspecto original
	}
}

function BtnBajarTemp(obj)
{
	var id_ter=parseInt(obj.getAttribute('IdTerm'));
	var temp_peque = document.getElementById('temp_peque'+id_ter);
	$('#icono_func_menos'+id_ter).fadeOut(100);
	$('#icono_func_menos'+id_ter).fadeIn(100);
	var data = tabla_valores[id_ter];
	data.configuracion.temperatura-=0.5;
	
	var elem1=document.getElementById('temp_grande'+id_ter);
    elem1.innerHTML=data.configuracion.temperatura+"�";
	if(data.configuracion.temperatura!=data.parametros.temperatura)
	{
		temp_peque.style.visibility='visible';
		if(timer_interval_modo==null)	
		{
			// se crea el temporizador parar destacar el cambio de modo
			timer_interval_modo=setInterval(func_inteval_modo,1000);
		}
	}
	else
	{
		temp_peque.style.visibility='hidden';
		$( '#temp_grande'+x ).fadeTo( 'slow',1 ); // rescatamos el aspecto original
	}
}

function BtnOn_off(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	$('#icono_onoff'+id_term).fadeOut(100);
	$('#icono_onoff'+id_term).fadeIn(100);

	var data = tabla_valores[id_term];
	
	if(data.estado==1)
		data.estado=0;
	else
		data.estado=1;
	Actualizar(1,id_term);
}

function btn_ver_conf_term1(obj)
{
	
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var data = tabla_valores[id_term];
	var t = document.querySelector('#conf_term1');
	document.getElementById("conf_grabar_term1").setAttribute( "IdTerm",id_term.toString());
	var modo = document.getElementById("modo_term");
	
	var elem =document.getElementById('ConfTerm1Label');
	elem.innerHTML=data.Caption;
	
	document.getElementById('Nombre_term').value=data.Caption;
	if(data.configuracion.modo==1) //modo calor
	{
		document.getElementById('opt_frio').checked=false;
		document.getElementById('opt_calor').checked=true;
	
	}
	else // modo frio
	{
		document.getElementById('opt_frio').checked=true;
		document.getElementById('opt_calor').checked=false;
	}
	
	
	$('#conf_term1').on('show.bs.modal', mostrarForm(this,id_term));
	$('#conf_term1').modal({
	//closeOnEscape: 'false',
    show: 'true'});
}

function btn_grabar_configuracion(obj)
{
	
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var data = tabla_valores[id_term];
	data.Caption=document.getElementById('Nombre_term').value;
	
	if(document.getElementById('opt_frio').checked)
	{
		data.configuracion.modo=0;
	}
	else
		data.configuracion.modo=1;
		
	Actualizar(0,id_term);
}


function mostrarForm( obj, id_term)
{
	
	
}

function Desplegar (id_term,origen)
{
	
	var marcoInf =document.getElementById('marco_inf'+id_term);
	var data = tabla_valores[id_term];
	
	if(data.EstaMinimizado==1)
	{
		$('#icono_OnOffSup'+id_term).fadeIn(400);
		
		if(origen==0)
			$('#marco_inf'+id_term).toggle("fade");
		
		
		var icono = document.getElementById('icono_despliegue'+id_term);
		icono.src="./graph/arrow_down.png";
		
		
	}
	else
	{
		
		$('#icono_OnOffSup'+id_term).fadeIn(300);
		$('#icono_OnOffSup'+id_term).fadeOut(400);
		
		var icono = document.getElementById('icono_despliegue'+id_term);
		icono.src="assets/img/arrow_up.png";
		
		if(origen==0)
			$('#marco_inf'+id_term).toggle("fade");
	}
	Actualizar(0,id_term);	
}


function Actualizar( cambiaEstado, id_term)
{
	var BotonMas = document.getElementById('btn_mas'+id_term);
	var BotonMemos = document.getElementById('btn_menos'+id_term);
	var ZonaIconos = document.getElementById('zona_iconos'+id_term);
	var MarcoSup = document.getElementById('marco_superior'+id_term);
	var MarcoInf = document.getElementById('marco_inf'+id_term);
	var MarcoTemp = document.getElementById('marco_temp'+id_term);
	var temp_peque = document.getElementById('temp_peque'+id_term);
	var term_modo = document.getElementById('term_modo'+id_term);
	var data = tabla_valores[id_term];
	
	

	
	var CaptionElem=document.getElementById('caption_temp'+id_term);
    CaptionElem.innerHTML=data.Caption;
	
	var tempAmbiente = document.getElementById('tempAmbiente'+id_term);
	tempAmbiente.innerHTML=data.parametros.temperaturaAmbiente+"�";
	
	
	
	
		
	if(data.estado==1) // si esta encendido
	{
		
		MarcoSup.style.backgroundColor="#555BA8";
		MarcoSup.style.color="#669";
		if(data.EstaMinimizado==1)
		{
			var iconoOnOffSup = document.getElementById('icono_OnOffSup'+id_term);
			iconoOnOffSup.src="./graph/on.png";
			
		}
		else
		{
			
			ZonaIconos.style.visibility='visible';
			
			
			 
			MarcoInf.style.color="#555BA8";
			MarcoInf.style.backgroundColor="#A9A8E8"
			MarcoTemp.style.visibility='visible';
			var iconoOnOff = document.getElementById('icono_onoff'+id_term);
			iconoOnOff.src="./graph/on.png";


			if(data.parametros.modo)
			{
				term_modo.src="./graph/estrella.png"
			}
			else
			{
				term_modo.src="./graph/radiador.png"
			}
			
			if(data.parametros.modo!=data.configuracion.modo  )// si hay alguna diferencia entre configuracion y parametros lo visualizamos 
			{
				if(timer_interval_modo==null)	
				{
					// se crea el temporizador parar destacar el cambio de modo
					timer_interval_modo=setInterval(func_inteval_modo,1000);
				}
			}
			else
				$( '#term_modo'+id_term ).fadeTo( 'slow',1); // rescatamos el aspecto inicial
				//term_modo.style.backgroundColor='#A9A8E8';

			if(data.configuracion.temperatura!=data.parametros.temperatura)
			{
				if(timer_interval_modo==null)	
				{
					// se crea el temporizador parar destacar el cambio de modo
					timer_interval_modo=setInterval(func_inteval_modo,1000);
				}
				temp_peque.style.visibility='visible';
			}
			else
			{
				temp_peque.style.visibility='hidden';
				$( '#temp_grande'+x ).fadeTo( 'slow',1 ); // rescatamos el aspecto original
			}
			
			
		}
		
	}
	else// apagado
	{
		
		MarcoSup.style.backgroundColor="#838DFF";
		MarcoSup.style.color="#C4DDF9";
		
		if(data.EstaMinimizado==1)
		{
			var iconoOnOffSup = document.getElementById('icono_OnOffSup'+id_term);
			iconoOnOffSup.src="./graph/off.png";
			
		}
		else
		{
			MarcoTemp.style.visibility='hidden';
			MarcoInf.style.backgroundColor="#E6E9FF";
			
			ZonaIconos.style.visibility='hidden';
			temp_peque.style.visibility='hidden';
			var iconoOnOff = document.getElementById('icono_onoff'+id_term);
			iconoOnOff.src="./graph/off.png";
			//$('#marco_temp'+id_term).hide();
		}
		
	}
}

function visibleTermostato(estado,id_term)
{
	var data = tabla_valores[id_term];
	data.visible=estado;

	var MarcoSup = document.getElementById('marco_superior'+id_term);
	if(estado==0)
		$('#termostato'+id_term).hide();
	else
	{
		$('#termostato'+id_term).show();
		MarcoSup.style.visibility='visible';
		Desplegar(id_term,1);
		
	}
	
}

function HayDatosCambiados_Term ( idTerm)
{
	var bRetorno = false;
	var obj=tabla_valores[x];
	//obj_dom= document.getElementById('term_modo'+x);
	if(	 (obj.parametros.modo != obj.configuracion.modo)|| (obj.parametros.temperatura != obj.configuracion.temperatura))
	{
		bRetormo=true;
	}	
	
	return bRetorno;
}

function func_inteval_modo()
{
	
	var obj;
	var obj_dom;
	var num_objetos=0;
	
	
	var objeto=null;
	for (x=0;x<tabla_objetos.length;x++)
	{
		if(tabla_objetos[x].HayDatosCambiados()=="true");
		{
			tabla_objetos[x].AccionCambioDatos();
			num_objetos++;
		}
		
	}
	
	
	// si no hay objetos que cambiar se desactiva el temporizador
	if(!num_objetos)
	{
		DesactivaVisualizacionCambio();
		
	}
}

function graph()
{
}


// ---------------------------------------------------------------------------------------------

/** Funcion que da el objeto que corresponde al identificativo que se le pasa por parametro
*@IdTerm Identificativo de objeto
*@return objeto con ese identificativo, en caso de no encontralo da null
*/
function DarObjeto(IdTerm)
{
	var objeto=null;
	for (x=0;x<tabla_objetos.length;x++)
	{
		if(tabla_objetos[x].get("Id")== IdTerm)
		{
			objeto=tabla_objetos[x];
			break;
		}
	}
	return objeto;
	
}
function EvntBtwDespliegue(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
		obj.Desplegar();

}

function EvntBtnOn_off(obj)
{
	debugger;
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
	{
		obj.CambioOnOff();
		obj.Actualizar();
	}
	
}


function EvnSubirTemp(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
		obj.SubirTemp();
}

function EvnBajarTemp(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
		obj.BajarTemp();
}

function EvntBtngraph(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
		obj.MostrarGraph();
}

function ActivarTemporizadorCambio()
{
	
	if(timer_interval_modo==null)	
	{
		// se crea el temporizador parar destacar el cambio de modo
		timer_interval_modo=setInterval(func_inteval_modo,1000);
	}
}

function DesactivaTemporizadorCambio()
{
	clearInterval(timer_interval_modo);
	timer_interval_modo=null;

	for (x=0;x<tabla_objetos.length;x++)
	{
		tabla_objetos[x].DesactivaTemporizadorCambio();
	
		
	}
	

}


function func_inteval_modo()
{
	
	var objeto;
	var contador=0;
	for (x=0;x<tabla_objetos.length;x++)
	{
		objeto=tabla_objetos[x];
	
		if(objeto.HayDatosCambiados()=="true")
		{
			objeto.AccionCambioDatos();
			contador++;
		}
		
	}
	
	if(contador==0) // no hay cambio de datos en los objeto
	{
		// se desactiva el temporizador
		DesactivaTemporizadorCambio();
	}
	
	
}


function func_inteval_lectura_datos()
{
	llamarServicioCarriots();
}

function llamarServicioCarriotsPrimeravez()
{
	

	var carriotsURL = 'http://api.carriots.com/devices/'+g_device+'/streams/?order=-1&max=30';

	$("#loading").removeClass('hide');
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);
        

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioRESTPrimeravez,
    error : function(jqXHR, status) { 
		
		//alert(jqXHR.getAllResponseHeaders());
	alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
		//alert(status +' fallo ');}
});
}



function llamarCarriotsMetodoPOST(datos)
{
	debugger;
	var cadenaSalida="{"+"\"protocol\":\"v2\","+"\"checksum\":\"\","+"\"device\":\"In"+g_device+"\","+"\"at\":\"now\","+"\"data\":{"+datos+"}}"
	

	var carriotsURL = 'http://api.carriots.com/streams';

	//$("#loading").removeClass('hide');
	$.ajax({
	/*headers : {
		"carriots.apikey": g_key,
		"Content-Type":"application/json",
        "Accept":"application/json"
	},*/
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);
        

		},
	
    type : "post",
	
    url: carriotsURL,
	data:cadenaSalida,
	success: function( data, textStatus, jQxhr ){
                  
                },
    error: function( jqXhr, textStatus, errorThrown ){
                  
                }
	
		
});
}

function recepcionServicioRESTPrimeravez (datosREST)
{
	
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
   
	var nodo=datosREST.result[0];
	var nodoTabla;
	
	var iNumElementos=parseInt(nodo.data['numElem']);

    // actualizamos el encabezado indicando la fecha de actualizacion
	var stringFecha = '         Ultimo Dato: '+DarStringFecha(nodo.at);
	var elem1=document.getElementById("fecha_actualizacion");
    elem1.innerHTML=stringFecha;
	
	
	// a�adimos los elementos a la tabla de 3 horas en orden LIFO ya que hay que mantener que el primer elemento sea el mas reciente
	//tabla_datos_tres_horas=datosREST.result.slice();

	
	if(iNumElementos>0)// Si no esta creado el campo numero de elementos no se continua con la creacion de objetos
	{
		if(tabla_objetos.length==0) // si no se ha creadoobjetos entonces creamos y los metemos en la tabla 
		{
			CreacionElementos(iNumElementos, nodo);
		
		}
		
	}
	ActualizarParametrosRecibidor(nodo,datosREST.result,'true'); // actualizamos los datos con los parametros recibidos
	
	timer_interval_lectura_datos=setInterval(llamarServicioCarriots,100000);// 10 minutos
	$("#loading").addClass('hide');
		
}


function llamarServicioCarriots()
{

//	**** var carriotsURL = 'http://api.carriots.com/devices/defaultDevice@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max=1';
//	var carriotsURL = 'http://api.carriots.com/devices/prueba@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max=1';
	var carriotsURL = 'http://api.carriots.com/devices/'+g_device+'/streams/?order=-1&max=30';
	$("#loading").removeClass('hide');
	
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);
       	},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioREST,
    error : function(jqXHR, status) { 
		
		//alert(jqXHR.getAllResponseHeaders());
	alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
		//alert(status +' fallo ');}
});
}


function recepcionServicioREST (datosREST)
{

	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
   	var nodo=datosREST.result[0];
	
	
//	var iNumElementos=parseInt(nodo.data['numElem']);

    // actualizamos el encabezado indicando la fecha de actualizacion
	var stringFecha = '         Ultimo Dato: '+DarStringFecha(nodo.at);
	var elem1=document.getElementById("fecha_actualizacion");
    elem1.innerHTML=stringFecha;
	
	ActualizarParametrosRecibidor(nodo,datosREST.result,'false'); // actualizamos los datos con los parametros recibidos
	
	
	$("#loading").addClass('hide');
	
}

function CreacionElementos(iNumElementos, nodo )
{
	var valor;
	var Tem1;
	debugger;
	for(var indice=0;indice<iNumElementos;indice++)
	{
		valor = nodo.data['ID_'+indice];
		if(valor!=null)
		{
			var TipoElemento=nodo.data['ID_'+indice];
			switch(TipoElemento)
			{
				case "0" : // termostato sistema
				    console.log("Crea elm Termostato sistema ["+indice+"]\n");
					Tem1= new TermostatoSistena(indice);
					Tem1.set("Visible",true);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(indice);
					break;
				case "1" : // datos genericos
					console.log("Crea elm contador ["+indice+"]\n");
					Tem1=new DatosGenerico(indice);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(indice);
					break;
				case "2" : // Altherma
					console.log("Crea elm TAltherma ["+indice+"]\n");
					Tem1=new Altherma(indice);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(indice);
					
				case "3" : // Trane
					//cargarRecursos("js/Trane.js");
					console.log("Crea elm Trane ["+(indice+4)+"]\n");
					Tem1=new Trane(indice+4);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(indice+4);
					break;
				default :
					break;
			}
		}
		else// si no hay mas elementos se para la creacion del bucle independiente del valor de contador que figure
			break;
	}
}

// funcion para insertar una opcion en el menu de elementos
function InsertaOpcionMenuElementos(IdElem )
{
	var obj=DarObjeto(IdElem);
	$("#menu_elementos").append("<li><a href=\"#\" "
	+"Elemento=\""+IdElem+"\""
	+"Estado=\"1\""
	+" Id=\"check"+IdElem +"\">" 
	+obj.get("Caption")  
	+"</a></li>");
	
	$("#check"+IdElem).click(  MenuElementoCheck);
	
	// � tiene registro asociado la opcion de menu ?
	var EstadoElemento=localStorage["hjm_elm"+IdElem];
	if(EstadoElemento==null)
	{
		// no existe se crea el elemento
		EstadoElemento="1";
		localStorage["hjm_elm"+IdElem]=EstadoElemento;
	}
	debugger;
	if(EstadoElemento=="0") // El estado es no visible
	{
		$("#Elemento"+IdElem).attr("Estado","0");
		$("#check"+IdElem).css("color","#DFE0DF");
		obj.set("Visible",false);
	}
	else // Estado Visible
	{
		$("#Elemento"+IdElem).attr("Estado","1");
	}
}

// Funcion que recibe el evento de pulsar el check de visibilidad del elemento
function MenuElementoCheck(objeto)
{
	debugger;
	var IdObjeto=$(this).attr('Elemento');
	var Estado=localStorage["hjm_elm"+IdObjeto];
	var color;
	var obj=DarObjeto(IdObjeto);
	if(Estado=="1")
		{
			Estado="0";
			color="#DFE0DF";
			obj.set("Visible",false);
			
		}
		else
		{
			Estado="1";
			color="#000000";
			obj.set("Visible",true);
			
		}
		
		localStorage["hjm_elm"+IdObjeto]=Estado;
		$(this).attr("Estado",Estado);
		$("#check"+IdObjeto).css("color",color);
		
	
	
}
// funcion que notifica a cada uno de los elementos existentes los datos recibidos para que se actualicen 
function ActualizarParametrosRecibidor(Parametros,ParametrosTresHoras,flgPrimeraVez)
{
	console.log("ActualizarParametrosRecibidor\n");
	ActualizarFooter(Parametros);
	var objeto;
	for (x=0;x<tabla_objetos.length;x++)
	{
		objeto=tabla_objetos[x];
		objeto.ProcesaDatos(Parametros,ParametrosTresHoras,flgPrimeraVez);
		
	}
}

function ActualizarFooter(Parametros)
{
	
	
	if(Parametros.data['city']!=null)
	{
		if(Parametros.data['city']!="")
		{
			var elem1=document.getElementById("city");
			elem1.innerHTML="&nbsp;&nbsp;"+Parametros.data['city'];
		}
	}
	
	if(Parametros.data['icon_tmp']!=null)
	{
		var elem = document.getElementById('icon_temp');
		if(Parametros.data['icon_tmp']!="")
			elem.src= "http://openweathermap.org/img/w/"+Parametros.data['icon_tmp']+".png";
	}
	
	if(Parametros.data['temp']!=null)
	{
		if(Parametros.data['temp']!="")
		{
			var elem1=document.getElementById("temp_city");
			elem1.innerHTML=Parametros.data['temp']+"�C";
		}
	}
	
}

function llamarServicioCarriotsNummObjt(idObjeto,NumObjetos)
{

	var carriotsURL = 'http://api.carriots.com/devices/'+g_device+'/streams/?order=-1&max='+NumObjetos;

	//var carriotsURL = 'http://api.carriots.com/devices/prueba@jesusasinrecalde.jesusasinrecalde/streams/?order=-1';

	IdObjetoGlobal=idObjeto;
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioRESTNumObjetos,
    error : function(jqXHR, status) { 
		
		//alert(jqXHR.getAllResponseHeaders());
	alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
		//alert(status +' fallo ');}
});
}


function recepcionServicioRESTNumObjetos (datosREST)
{
	
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
  
	var obj=DarObjeto(IdObjetoGlobal);
	if(obj)
		obj.ProcesaDatosPeticion(datosREST);
	
	
}


// Funcion para deslogarse del sistema , se borra el registro y se redirige a la pagina de login 
function EvntLogout ( obj)
{

	localStorage.removeItem("hjm_key");
	localStorage.removeItem("hjm_device");
	$('#actualizar_dat').hide();
    $('#login-modal').modal('show');
	

}

function EvntLogin ( obj )
{
	$('#login-modal').modal('show');
	
}

function About ( obj )
{
	$('#about').modal('show');
	
}

function aboutClick()
{
	window.open ('http://hejmo.es',false);
}

function ActualizarDatos(obj)
{
		llamarServicioCarriots();
}

function EvntBtnAlthermConf(obj)
{
	var objeto;
	var contador=0;
	$(obj).fadeTo(100, 0.1).fadeTo(200, 1.0);
	
	Id=obj.getAttribute('objid');
	
	var obj=DarObjeto(Id);
	if(obj)
	{
		obj.MostrarVentanaModal();
	}
	
}

function EvntBtnFINAlthermConf(boton,obj)
{
	
	
	$(boton).fadeTo(100, 0.1).fadeTo(200, 1.0);
	
	var ObjId=obj.getAttribute('elm');
	var objeto=DarObjeto(ObjId);
	debugger;
	
	if(objeto)
	{
		objeto.FinalizarVentanaModal();	
		$(obj).modal('toggle'); // se cierra la ventana 
	}
	
	
	EnviarDatos(); // se envia los datos independientemente de si cambian o no sera la raspberri quien sepa si cambian o no 
	
	if(DetectarDatosCambiados()=="true")
	{
		ActivarVisualizacionCambio();
	}
	else
	{
		DesactivaVisualizacionCambio();
	}
	
}	

function EvnReload(boton,obj)
{
	var objeto;
	var contador=0;
	$(boton).fadeTo(100, 0.1).fadeTo(200, 1.0);

	var ObjId=obj.getAttribute('elm');
	var objeto=DarObjeto(ObjId);
	
	if(objeto)
	{
		objeto.EventoVentanaModal(1);	
	}

}


function DetectarDatosCambiados()
{
	var retorno="false";
	var objeto;
	
	for (x=0;x<tabla_objetos.length && retorno == "false" ;x++)
	{
		objeto=tabla_objetos[x];
		retorno=objeto.HayDatosCambiados();
	
	}	
	return retorno;
}

function ActivarVisualizacionCambio()
{
	if(timer_interval_modo==null)	
	{
			// se crea el temporizador parar destacar el cambio de modo
		timer_interval_modo=setInterval(func_inteval_modo,1000);
	}
}

function DesactivaVisualizacionCambio()
{
	if(timer_interval_modo)
	{
			clearInterval(timer_interval_modo);
			timer_interval_modo=null;
	}
	
	var objeto=null;
	for (x=0;x<tabla_objetos.length;x++)
	{
		tabla_objetos[x].DesactivaTemporizadorCambio();
		
		
	}
	
}

function EnviarDatos(obj)
{
	if(DetectarDatosCambiados()=="true")
	{
		var textoEnviar="";
	
	
		var objeto=null;
		for (x=0;x<tabla_objetos.length;x++)
		{
			var cadena=	tabla_objetos[x].DarDatosAGrabar();
			if(cadena!=null)
				textoEnviar+=cadena;
		
		}
	//var cadena="\"valor\":\"dato\"";
	
		llamarCarriotsMetodoPOST(textoEnviar);
	}
	
}

function MostrarErrorFaldon(Identificativo,texto)
{
	if(document.getElementById( Identificativo )==null)
	{
		if(NumeroErroresFaldon==0)
		{
			$("#errorfaldon").show();
		}
		NumeroErroresFaldon++;
		$("#errorfaldon").append("<div id=\""+Identificativo+ "\">"
								+texto
								+"</div>");
		
		var opciones = {
			iconUrl: "graph/warning_1.png", /* (opcional) a�n no implementado */
			icon: "graph/warning_1.png", /* (opcional) a�n no implementado */
			//body: "Contenido del cuerpo de la notificaci�n", /* (opcional) si se omite el t�tulo ser� el cuerpo */
			tag: Identificativo /* (opcional) Nunca habr� dos notificaciones con la misma etiqueta, as� que cuando se muestre se cerrar�n las otras que tengan la misma etiqueta */
		}
		// Creamos la notificaci�n
		var notificacion = new window.Notification(texto, opciones);
		// La mostramos
		//notificacion.show();
	}
}

function BorrarErrorFaldon(Identificativo)
{
	debugger;
	if(document.getElementById( Identificativo ))
	{
		
		NumeroErroresFaldon--;
		var element = document.getElementById(Identificativo);
		element.parentNode.removeChild(element);
		
		if(NumeroErroresFaldon==0)
		{
			$("#errorfaldon").hide();
		}
	}
}


function InicializaVisError()
{
	$('#errorfaldon').hide();
	NumeroErroresFaldon=0;
}


var cargarObjetos="";
  function cargarRecursos()
  {
    if(!document.getElementById)
	{
         return;
    }
    var i = 0;
	for(i=0; i<arguments.length; i++)
	{
        var archivo=arguments[i];
		var archivoref="";
        if(cargarObjetos.indexOf(archivo)==-1)
		{
            if(archivo.indexOf(".js")!=-1)
			{
                archivoref=document.createElement('script');archivoref.setAttribute("type","text/javascript");
                archivoref.setAttribute("src", archivo);
            }else if(archivo.indexOf(".css")!=-1)
			{
                archivoref=document.createElement("link");
                archivoref.setAttribute("rel", "stylesheet");
                archivoref.setAttribute("type", "text/css");
                archivoref.setAttribute("href", archivo);
            }
        }
		if(archivoref!="")
		{
            document.getElementsByTagName("head").item(0).appendChild(archivoref);
            cargarObjetos+=archivo+" ";
        }
    }
  }