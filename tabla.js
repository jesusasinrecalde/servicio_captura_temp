

var tabla_valores;
var actualizar_datos; // flag para indicar si hay datos modificados o no
var timer_actualizar_datos; // temporizador utilizado para realizar el parpadeo en el caso que actualizar_datos sea true
var Tem1;
var tabla_objetos;
var timer_interval_modo;
window.onload = function() {

	tabla_valores = new Array();
	tabla_objetos = new Array();
	actualizar_datos = false;
	timer_interval_modo=null;
	
	//Tem1= new TermostatoSistena(0);
	//Tem1.set("Visible",true);
	
	//tabla_objetos.push(Tem1);
	
	//Tem1=new DatosGenerico(1);
	//tabla_objetos.push(Tem1);
	//crearTermostatoTipo0( 0);
	llamarServicioCarriots(); 	
	//crearTermostatoTipo0( 1);
	//crearTermostatoTipo0( 2);
	//crearTermostatoTipo0( 3);
	//crearTermostatoTipo0( 4);
	//crearTermostatoTipo0( 5);
	//crearTermostatoTipo0( 6);
	//crearTermostatoTipo0( 7);
	
	debugger;
	//visibleTermostato(1,0);
	//visibleTermostato(1,1);
	//visibleTermostato(0,2);
	//visibleTermostato(1,3);
	//visibleTermostato(1,4);
	//visibleTermostato(1,5);
	//visibleTermostato(1,6);
	//visibleTermostato(1,7);
	

}

/** Crear estructura termostato de tipo sistena ( 0 )
*/
function crearTermostatoTipo0( id_term)
{
	debugger;
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
	debugger;
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
	debugger;
	var id_ter=parseInt(obj.getAttribute('IdTerm'));
	var temp_peque = document.getElementById('temp_peque'+id_ter);
	$('#icono_func_mas'+id_ter).fadeOut(100);
	$('#icono_func_mas'+id_ter).fadeIn(100);
	var data = tabla_valores[id_ter];
	data.configuracion.temperatura+=0.5;
	
	var elem1=document.getElementById('temp_grande'+id_ter);
    elem1.innerHTML=data.configuracion.temperatura+"º";

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
    elem1.innerHTML=data.configuracion.temperatura+"º";
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
	debugger;
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var data = tabla_valores[id_term];
	var t = document.querySelector('#conf_term1');
	document.getElementById("conf_grabar_term1").setAttribute( "IdTerm",id_term.toString());
	var modo = document.getElementById("modo_term");
	/*
	var modo=document.querySelector('#modo_term');
	for(i=0;i<modo.modo.length;i++)
	{
		modo.modo[i].value=false;
	}
	modo.modo[data.configuracion.modo].value=true;
*/
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
	debugger;
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
	
	debugger;
}

function Desplegar (id_term,origen)
{
	
	var marcoInf =document.getElementById('marco_inf'+id_term);
	var data = tabla_valores[id_term];
	debugger;
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
		icono.src="./graph/arrow_up.png";
		
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
	tempAmbiente.innerHTML=data.parametros.temperaturaAmbiente+"º";
	
	
	
	debugger;
		
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
		debugger;
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
	debugger;
	var obj;
	var obj_dom;
	var num_objetos=0;
	debugger;
	for (x=0;x<tabla_valores.length;x++)
	{
		obj=tabla_valores[x];
		obj_dom= document.getElementById('term_modo'+x);
		if(	 (obj.parametros.modo != obj.configuracion.modo)|| (obj.parametros.temperatura != obj.configuracion.temperatura))
		{	
			if(obj.EstaMinimizado==0)
			{
				if(obj.parametros.modo != obj.configuracion.modo)
				{
					if(obj.iluminadoModo)
						$( '#term_modo'+x ).fadeTo( 'slow',.3 );
					else
						$( '#term_modo'+x ).fadeTo( 'slow',1);
				}
				else
				{
					$( '#term_modo'+x ).fadeTo( 'slow',1 );
				}
			
			
				if(obj.parametros.temperatura != obj.configuracion.temperatura)
				{
					if(obj.iluminadoModo)
						$( '#temp_grande'+x ).fadeTo( 'slow',.3 );
					else
						$( '#temp_grande'+x ).fadeTo( 'slow',1);
				}
				else
				{
					$( '#temp_grande'+x ).fadeTo( 'slow',1 );
				}	
			
			}
			
			num_objetos++;
			if(obj.iluminadoModo)
			{
				obj.iluminadoModo=false;
				$( '#caption_temp'+x ).fadeTo( 'slow',.3 );
			}
			else
			{
				obj.iluminadoModo=true;
				$( '#caption_temp'+x ).fadeTo( 'slow',1 );
			}
		}
		else
			$( '#caption_temp'+x ).fadeTo( 'slow',1 );
		
	}// for...
	
	// si no hay objetos que cambiar se desactiva el temporizador
	if(!num_objetos)
	{
		clearInterval(timer_interval_modo);
		timer_interval_modo=null;
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
	var objeto=null
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
	//Tem1.Desplegar();
	//var id_term=parseInt(obj.getAttribute('IdTerm')); // asi se obtiene el Id 
	//var data = tabla_valores[id_term];
	//$('#icono_desplegar'+id_term).fadeOut(100);
	//$('#icono_desplegar'+id_term).fadeIn(100);


//	if(data.EstaMinimizado==1)// si esta minimizado ...
//	{
//		data.EstaMinimizado=0;// ... se maximiza
//		
//	}
//	else
//	{
//		data.EstaMinimizado=1;
//		
//	}
//	Desplegar(id_term,0);
			

}

function EvntBtnOn_off(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
		obj.CambioOnOff();
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
	debugger;
	var objeto;
	var contador=0;
	for (x=0;x<tabla_objetos.length;x++)
	{
		objeto=tabla_objetos[x];
	
		if(objeto.HayDatosCambiados())
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


function llamarServicioCarriots()
{
//	var carriotsURL = 'http://api.carriots.com/devices/defaultDevice@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max=1';
	var carriotsURL = 'http://api.carriots.com/devices/prueba@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max=1';
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey","ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713");
	},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioREST,
    error : function(jqXHR, status) { alert(status +' fallo ');}
});
}

function recepcionServicioREST (datosREST)
{
	
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
    debugger;
	var nodo=datosREST.result[0];
	var valor;
	var Tem1;
	var NumElementos=nodo.data['numElem'];
	if(NumElementos==null)// Si no esta creado el campo numero de elementos no se continua con la creacion de objetos
		return;
	var iNumElementos=parseInt(NumElementos);
	for(var indice=0;indice<iNumElementos;indice++)
	{
		valor = nodo.data['ID_'+indice];
		if(valor!=null)
		{
			var TipoElemento=nodo.data['ID_'+indice];
			switch(TipoElemento)
			{
				case "0" : // termostato sistema
					Tem1= new TermostatoSistena(indice);
					Tem1.set("Visible",true);
					tabla_objetos.push(Tem1);
					break;
				case "1" : // datos genericos
					Tem1=new DatosGenerico(indice);
					tabla_objetos.push(Tem1);
					break;
				default :
					break;
			}
			
			
		}
		else// si no hay mas elementos se para la creacion del bucle independiente del valor de contador que figure
			break;
	}
	ActualizarParametrosRecibidor(nodo); // actualizamos los datos con los parametros recibidos
	
}

function ActualizarParametrosRecibidor(Parametros)
{
	var objeto;
	for (x=0;x<tabla_objetos.length;x++)
	{
		objeto=tabla_objetos[x];
		objeto.ProcesaDatos(Parametros);
		
	}
}