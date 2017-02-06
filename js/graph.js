 

var bDesplegable=0;
var lineChartData  = { data: []};
var mesok=new Array(12);
	mesok[0]="Enero";
	mesok[1]="Febrero";
	mesok[2]="Marzo";
	mesok[3]="Abril";
	mesok[4]="Mayo";
	mesok[5]="Junio";
	mesok[6]="Julio";
	mesok[7]="Agosto";
	mesok[8]="Septiembre";
	mesok[9]="Octubre";
	mesok[10]="Noviembre";
	mesok[11]="Diciembre";
	
var tablaLlamadas = new Array();
var IterAccionActual=0;
var NumeroIterAcciones=0;
var ValorMaximo=0;
var ValorMinimo=99999999999;
var FechaValorMaximo;
var FechaValorMinimo;

var stringFechaInicio;
var stringFechaFin;


// variables necesarias para la operativa de generar informe por fecha 
var LlamadaCarriots="";
var offset=0;
var flgPrimeraVez;
var Gvalor_inicio=null;
var Gvalor_anterior=null;
var Gvalor_final=0;
var nodoInicio;

// variables necesarias para la operativa de generar informe por fecha con rangos 
var tablaFechas = new Array();
var NumeroFechaInteracciones=0;
var NumeroFechaInteraccionActual=0;

var GData=null;


var TextoGrafico;
var g_key;
var g_device;

var idHejmo=0;

window.onload = function() {
	
	debugger;
	
	var parametros =getUrlVars();
	if(parametros.id!=null)
	{
		idHejmo=parametros.id;
	}
	
	g_key=localStorage["hjm_key"];
	g_device=localStorage["hjm_device"];
	if(g_key==null || g_device==null)
	{
		
		$('#login-modal').modal('show');
	}
	else
	{
		
		LanzamientoHejmo();
	}

}

function LanzamientoHejmo()
 {

	$(".desplegable").hide( );
	$('#login-modal').modal('hide');	
	
 //$('#datetimepicker_inicio').datetimepicker({
 //       format: 'dd/MM/yyyy hh:mm:ss',
 //       language: 'es-ES'
 //     });
 //$('#datetimepicker_fin').datetimepicker({
 //       format: 'dd/MM/yyyy hh:mm:ss',
 //       language: 'es-ES'
 //     });
//
//$( "#datepicker_inicio" ).datepicker();
//$( "#datepicker_fin" ).datepicker();


     $('#datetimepicker_from').datetimepicker({
            format : 'YYYY-MM-DD HH:mm',
                        icons : {
               // time: "fa fa-clock-o",
               time: "glyphicon glyphicon-time",
			   // date: "fa fa-calendar",
				date: "glyphicon glyphicon-calendar",
			     up: "glyphicon glyphicon-arrow-up",
                down: "glyphicon glyphicon-arrow-down",
				 locale: 'es-ES'
				 
            },
            useCurrent: false //Important! See issue #1075
        }).on("dp.change", function (e) {
            $('#datetimepicker_to').data("DateTimePicker").minDate(e.date);
        });
        $('#datetimepicker_to').datetimepicker({
            format : 'YYYY-MM-DD HH:mm',
                        icons : {
                //time: "fa fa-clock-o",
                time: "glyphicon glyphicon-time",
				date: "fa fa-calendar",
               // date: "glyphicon glyphicon-calendar",
				up: "glyphicon glyphicon-arrow-up",
                down: "glyphicon glyphicon-arrow-down",
				 locale: 'es-ES'
            },
            useCurrent: false //Important! See issue #1075
        }).on("dp.change", function (e) {
            $('#datetimepicker_from').data("DateTimePicker").maxDate(e.date);
        });


	g_key=localStorage["hjm_key"];
	g_device=localStorage["hjm_device"];
	
    
	//g_key="ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713";
	//g_device="prueba1@jesusasinrecalde.jesusasinrecalde";
	
	
	
	$("#btn_izddown").hide();
	$("#btn_dchdown").hide();
		
	

	$("#btn_24Horas").addClass('active');
	DarGrafico24horas();
	
}

function DarGrafico24horas()
{
	TextoGrafico="Consumo ultimas 24 horas"
	BarraProgreso_reset();
	CalculoIterAcciones(144);
	llamarServicioCarriotsNummObjt(144);
	
}

function DarGrafico48Horas()
{
	TextoGrafico="Consumo ultimas 48 horas"
	BarraProgreso_reset();
	CalculoIterAcciones(288);
	llamarServicioCarriotsNummObjt(288);
}

function DarGrafico7dias()
{
	debugger;
	TextoGrafico="Consumo ultimos 7 dias"
	BarraProgreso_reset();
	CalculoIterAcciones(1008);
	
	llamarServicioCarriotsNummObjt(1008);
}

function CalculoIterAcciones(numeroIter)
{
	// Inicializacion de las variables globales
	tablaLlamadas.length =0;  // tabla de definicion de iteacciones
	IterAccionActual=0; 
	NumeroIterAcciones=0;
	var division = numeroIter / 1000;
	var parteEntera = parseInt(division);
	var parteDecima = numeroIter % 1000;
	
	var indice=0;
	for(indice=0;indice<parteEntera;indice++)
	{
		tablaLlamadas.push({offset: indice*1000 , maximo: 1000 });
		NumeroIterAcciones++;
	}
	if(parteDecima)
	{
		tablaLlamadas.push({offset: indice*1000 , maximo: parteDecima });
		NumeroIterAcciones++;
	}
	return NumeroIterAcciones;
	
}

function DarGrafico1Mes()
{
	TextoGrafico="Consumo ultimos 30 Dias"
	CalculoIterAcciones(2016*2);
	llamarServicioCarriotsNummObjt(2016*2);
}
// Leer los datos GET de nuestra pagina y devolver un array asociativo (Nombre de la variable GET => Valor de la variable).
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function EvntBtnizdup(obj)
{
	debugger;
	$("#cuerpo_izd").hide();
	$("#btn_izddown").show();
	$("#btn_izdup").hide();
}

function EvntBtnizddown(obj)
{
	$("#cuerpo_izd").show();
	$("#btn_izddown").hide();
	$("#btn_izdup").show();
}

function EvntBtndchup(obj)
{
	$("#cuerpo_dch").hide();
	$("#btn_dchdown").show();
	$("#btn_dchup").hide();
}

function EvntBtndchdown(obj)
{
	$("#cuerpo_dch").show();
	$("#btn_dchdown").hide();
	$("#btn_dchup").show();
}

function EvntBtn24Horas(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_24Horas").addClass('active');
	DesplegarPanelFecha(1);
	DarGrafico24horas();
}
function EvntBtn48Horas(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_7Dias").addClass('active');
	 DesplegarPanelFecha(1);
	DarGrafico48Horas();

}

function EvntBtn7Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_30Dias").addClass('active');
	 DesplegarPanelFecha(1);
	DarGrafico7dias();

}

function EvntBtn1Mes(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_90Dias").addClass('active');
	 DesplegarPanelFecha(1);
	 DarGrafico1Mes();
	
}

function EvntBtn180Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_180Dias").addClass('active');
	 DesplegarPanelFecha(1);
	
}

function EvntBtn365Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_365Dias").addClass('active');
     DesplegarPanelFecha(0);
  
	
}
function DesplegarPanelFecha(bControlDesplegable)
{
	if(bControlDesplegable )
	{
		if(bDesplegable==1)
		{
			$(".desplegable").slideUp( 'slow');
			bDesplegable=0;
		}
	}
	else
	{
			
		if(bDesplegable==1)
		{
			$(".desplegable").slideUp( 'slow');
			bDesplegable=0;
		}
		else
		{
			bDesplegable=1;
			$(".desplegable").slideDown( 'slow');
		}
	}

}


function EvntBtnInformeFecha(obj)
{
	BarraProgreso_reset();
	debugger;
	
	
	
	var DateIni = new Date($('#datetimepicker_from').data('date'));
	var DateFin = new Date($('#datetimepicker_to').data('date'));
	
	//var DateIni = $('#datetimepicker_to').data('datetimepicker').viewDate();
	//var DateFin = $('#datetimepicker_from').data('datetimepicker').viewDate();
	if(DateIni && DateFin && DateFin.getTime()>=DateIni.getTime())
	{
		// Cabecera del grafico
		TextoGrafico='Consumo '+DateIni.getDate()+' '+mesok[DateIni.getMonth()]+' '+DateIni.getFullYear()+'-'
							   +DateFin.getDate()+' '+mesok[DateFin.getMonth()]+' '+DateFin.getFullYear();
		
		
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var fechaCarriotsInit=Math.abs(DateIni.getTime()/1000);
		var fechaCarriotsFin=Math.abs(DateFin.getTime()/1000);
		
	
		var totalDias= Math.round(Math.abs((DateIni.getTime() - DateFin.getTime())/(oneDay)));;
		if(totalDias< 30 )
		{
			LlamadaCarriots='https://api.carriots.com/streams/?device='+g_device+'&order=-1&created_at_from='+fechaCarriotsInit+'&created_at_to='+fechaCarriotsFin;
			offset=0;
			flgPrimeraVez=1;
			llamarServicioCarriotsFecha();
		}
		else 
		{
			var multiplicador=1;
			
			if(totalDias<30)
				multiplicador=1;
			else if(totalDias>31 && totalDias<120 )
				multiplicador=1;
			else if(totalDias>121 && totalDias<240 )
			    multiplicador=7; 
			else if(totalDias>241 && totalDias<360 )
			    multiplicador=14;
			else
				multiplicador=28;
			
			var FechaInicio = new Date(DateIni);
			var FechaFin = new Date(DateFin);
			GenerarGraficoRangoFechas(FechaInicio, FechaFin, oneDay*multiplicador );


			
		}
	}
	
}


function GenerarGraficoRangoFechas(FechaInicio, FechaFin, Diferencia )
{
			
			var FechaNum=FechaInicio.getTime();
			var FechaFinNum=FechaFin.getTime();
			
			FechaNum=FechaNum-Diferencia
			
			
// -----------------------------------------------
// Inicializacion de las variables globales
			tablaFechas.length =0;  // tabla de definicion de iteacciones
			NumeroFechaInteracciones=0;
			NumeroFechaInteraccionActual=0;
			
	
			var division = (FechaFin.getTime()-FechaInicio.getTime()) / Diferencia;
			var parteEntera = parseInt(division);
			var parteDecima = (FechaFin.getTime()-FechaInicio.getTime()) % Diferencia;
			debugger;
			var indice=0;
			for(indice=0;indice<=parteEntera;indice++)
			{
				tablaFechas.push({FechaIni: FechaNum  , Valor:0 });
				FechaNum=FechaNum+Diferencia;
				NumeroFechaInteracciones++;
			}
			if(parteDecima)
			{
				tablaLlamadas.push({FechaIni: FechaFinNum , Valor:0 });
				tablaFechas.push({FechaIni: FechaFinNum  , Valor:0 });
				NumeroFechaInteracciones++;
			}
			llamarServicioCarriotsFechaRango();
}

function randomScalingFactor(){ return Math.round(Math.random()*100)}

function llamarServicioCarriotsNummObjt(NumObjetos)
{
	debugger;
	//$('#loading').show();
	//$('#load_window').modal('show');
	$("div#divLoading").addClass('show');
	elem1=document.getElementById('CabeceraGrafico');
    elem1.innerHTML="";
	
	var carriotsURL='https://api.carriots.com/streams/?max='+tablaLlamadas[IterAccionActual].maximo+"&device="+g_device+"&order=-1&created_at_from=0&offset="
	      +tablaLlamadas[IterAccionActual].offset
	
	
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
		debugger;
		//alert(jqXHR.getAllResponseHeaders());
	alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
		//alert(status +' fallo ');}
});
}

function llamarServicioCarriotsFecha()
{

	//$('#loading').show();
	//$('#load_window').modal('show');
	$("div#divLoading").addClass('show');
	elem1=document.getElementById('CabeceraGrafico');
    elem1.innerHTML="";
	
	flgPrimeraVez=1;
	
	var carriotsURL=LlamadaCarriots+'&offset='+offset;

	//IdObjetoGlobal=idObjeto;
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioRESTFecha,
    error : function(jqXHR, status) { 
		
	alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
	
});
}

function llamarServicioCarriotsFechaRango()
{
	
	//$('#loading').show();
	//$('#load_window').modal('show');
	
	$("div#divLoading").addClass('show');
	elem1=document.getElementById('CabeceraGrafico');
    elem1.innerHTML="";
	

	var fechaInitCarriots= Math.abs(tablaFechas[NumeroFechaInteraccionActual].FechaIni / 1000);
	var fechaFinCarriots=fechaInitCarriots+2000;
	LlamadaCarriots='https://api.carriots.com/streams/?device='+g_device+'&order=1&created_at_from='+fechaInitCarriots+'&created_at_to='+fechaFinCarriots;
	
	var carriotsURL=LlamadaCarriots;

	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioRESTFechaRango,
    error : function(jqXHR, status) { 
		alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
		});
}




function recepcionServicioRESTNumObjetos (datosREST)
{
	debugger;
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
	
	debugger;
	var offset=0;
	if(numdatos>200 && numdatos<500)
		offset=3;
	else if( numdatos>=500)
		offset=6;
	//var salida= barChartData;

	
	var x = new Date();
	var currentTimeZoneOffsetInHours = x.getTimezoneOffset()/60;
	var offsetTime = 3600000*(currentTimeZoneOffsetInHours*-1);
	
	var indice = numdatos-1;
	var nodo=datosREST.result[indice];
	//var nodoInicio=datosREST.result[0];
	var vconsumoTotal=0;
	
	// Se limpia las tablas si es la primera iteraccion-------------
	if(IterAccionActual==0)
	{
		
		
		
		lineChartData.data.length=0;
		
		
		// Inicializacion de los valores maximo y minimo de consumo
		ValorMaximo=0;
		ValorMinimo=99999999999;
		FechaValorMaximo="";
		FechaValorMinimo="";
		
		vconsumoTotal=0;
		
		nodoInicio=datosREST.result[0]; // obtencion del primer nodo
		
		
		
	
	}
	// -------------------------------------------------------------
   
	
	
	var valor_dato9;
	valor_dato9=nodo.data['0_dat9'];
	var valor_anterior=null;
	var valor_inicio=null;
	var valor_final=null;
	
	
	if(valor_dato9!=null)
	{
		//valor_anterior=parseFloat(nodo.data['0_dat9']);
		//valor_inicio=parseFloat(nodo.data['0_dat9']);
		//valor_final=parseFloat(datosREST.result[0].data['0_dat9']);
		valor_anterior=parseFloat(nodo.data[idHejmo+'_dat9']);
		valor_inicio=parseFloat(nodo.data[idHejmo+'_dat9']);
		valor_final=parseFloat(datosREST.result[0].data[idHejmo+'_dat9']);
		vconsumoTotal=valor_final-valor_inicio;// se tiene que comparar al final del proceso .....
	}
	
	var valor_dato;
	//var lineChartData  = { data: []};
	var contadoroffset=0;
	var dato_resta=0;
	
	var nodoSiguiente;
	var Dato;
	var DatoSiguiente;
	var valor_dato9siguiente;
	for( indice = 0;indice<numdatos-2;indice++)
	{
		nodo=datosREST.result[indice];
		nodoSiguiente=datosREST.result[indice+1];
		
		valor_dato9=nodo.data[idHejmo+'_dat9'];
		valor_dato9siguiente=nodoSiguiente.data[idHejmo+'_dat9'];
		if(valor_dato9!=null && valor_dato9siguiente!=null)
		{
			Dato=parseFloat(nodo.data[idHejmo+'_dat9']);
			DatoSiguiente=parseFloat(nodoSiguiente.data[idHejmo+'_dat9']);
			
			dato_resta=Dato-DatoSiguiente;
			if(dato_resta>0 && dato_resta<1)
			{
				
				
				lineChartData.data.unshift({x: (nodo.at*1000)+offsetTime , y: dato_resta }); // se inserta el dato en la tabla ¡¡¡¡ al principio !!!!!


	
			}
		}
	}
	
	
	IterAccionActual++;
	debugger;
	BarraProgreso_avanza(IterAccionActual,NumeroIterAcciones);
	if( NumeroIterAcciones<=IterAccionActual) // estamos al final del barrido 
	{
		debugger;
		// Fecha del ultimo nodo 
		var d = new Date ((nodo.at*1000));

		var stringFecha = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()
	      +':'+d.getMinutes();
		stringFechaFin = stringFecha;

		 VisualizaValoresPanelIzd(ValorMaximo,FechaValorMaximo,ValorMinimo,FechaValorMinimo,vconsumoTotal,stringFechaInicio,stringFechaFin);
	

		pintaGrafico(lineChartData.data);
		
	
		//$('#loading').hide();
		//$('#load_window').modal('hide');  
		$("div#divLoading").removeClass('show');
	}
	else 
	{
		llamarServicioCarriotsNummObjt(0);
	}
	
	
	

}

function recepcionServicioRESTFecha (datosREST)
{
	debugger;
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
	
	debugger;
	
	//var salida= barChartData;


	var indice = numdatos-1;
	var nodo=datosREST.result[indice];
	//var nodoInicio=datosREST.result[0];

	var x = new Date();
	var currentTimeZoneOffsetInHours = x.getTimezoneOffset()/60;
	var offsetTime = 3600000*(currentTimeZoneOffsetInHours*-1);
	
	// Se limpia las tablas si es la primera iteraccion-------------
	if(flgPrimeraVez==1)
	{
		
		
	
		lineChartData.data.length=0;
		
		
		// Inicializacion de los valores maximo y minimo de consumo
		ValorMaximo=0;
		ValorMinimo=99999999999;
		FechaValorMaximo="";
		FechaValorMinimo="";
		
		consumoTotal=0;
		if(numdatos)
		{
			nodoInicio=datosREST.result[0]; // obtencion del primer nodo que es el mas viejo
		
			// Fecha del primer nodo----------------------------------	  
			var d = new Date ((nodoInicio.at*1000));
			stringFechaInicio = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()+':'+d.getMinutes();
			stringFechaFin="";
			//SacarConsolaFecha(nodoInicio.at*1000);
			
		}
	}
	// -------------------------------------------------------------
    debugger;

    
	var valor_dato9=null;
	var valor_anterior=null;
	var valor_inicio=null;
	var valor_final=null;
	
	//if(valor_dato9!=null)// si hay en el nodo datos validos ( dat9 )
	//{
	//	valor_anterior=parseFloat(nodo.data['0_dat9']);
	//	valor_inicio=parseFloat(nodo.data['0_dat9']);
	//	valor_final=parseFloat(datosREST.result[0].data['0_dat9']);
	//	consumoTotal=valor_final-valor_inicio;// se tiene que comparar al final del proceso .....
	//}
	
	var valor_dato;
	//var lineChartData  = { data: []};
	var contadoroffset=0;
	var dato_resta=0;
	
	var nodoSiguiente;
	var Dato;
	var DatoSiguiente;
	var valor_dato9siguiente;
	for( indice = 0;indice<numdatos-2;indice++)
	{
		nodo=datosREST.result[indice];
		nodoSiguiente=datosREST.result[indice+1];
		SacarConsolaFecha(nodo.at*1000);
		
		valor_dato9=nodo.data[idHejmo+'_dat9'];
		valor_dato9siguiente=nodoSiguiente.data[idHejmo+'_dat9'];
		if(flgPrimeraVez==1 && valor_dato9!=null) // si es la primera vez el valor marca el primer dato valido 
		{
			flgPrimeraVez=0;
			Gvalor_anterior=parseFloat(nodo.data[idHejmo+'_dat9']);
			Gvalor_inicio=parseFloat(nodo.data[idHejmo+'_dat9']);
			Gvalor_final=parseFloat(nodo.data[idHejmo+'_dat9']);
			flgPrimeraVez=0; // desactivamos el flag de primera vez
			
		}		
		if(valor_dato9!=null && valor_dato9siguiente!=null)
		{
			Dato=parseFloat(nodo.data[idHejmo+'_dat9']);
			DatoSiguiente=parseFloat(nodoSiguiente.data[idHejmo+'_dat9']);
			Gvalor_final=parseFloat(nodo.data[idHejmo+'_dat9']);
			dato_resta=Dato-DatoSiguiente;
			
			
			if(dato_resta>0 && dato_resta<6)
			{
			
				
				lineChartData.data.unshift({x: (nodo.at*1000)+offsetTime , y: dato_resta }); // se inserta el dato en la tabla ¡¡¡¡ al principio !!!!!


				
			}
		}
	}
	
	//IterAccionActual++;
	
	if( numdatos<1000 ) // estamos al final del barrido y hay datos 
	{
		pintaGrafico(lineChartData.data);
			
		
		$("div#divLoading").removeClass('show');
	}
	else
	{
		offset+=1000;
		llamarServicioCarriotsFecha();
	}
	
	
	

}



function recepcionServicioRESTFechaRango (datosREST)
{

	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
	
	

	var indice = numdatos-1;
	var nodo=datosREST.result[indice];
	//var nodoInicio=datosREST.result[0];

	
	// Se limpia las tablas si es la primera iteraccion-------------
	if(NumeroFechaInteraccionActual==0)
	{
		
		

		lineChartData.data.length=0;
		
		
		// Inicializacion de los valores maximo y minimo de consumo
		ValorMaximo=0;
		ValorMinimo=99999999999;
		FechaValorMaximo="";
		FechaValorMinimo="";
		
		consumoTotal=0;
		
	}
	
	if(numdatos)
	{
		
		var indice=0;
		var valor;
		for( indice = 0;indice<numdatos;indice++)
		{
			nodo=datosREST.result[indice];
			valor_dato9=nodo.data[idHejmo+'_dat9'];
			if(valor_dato9!=null) // solo podemos poner una dato si este existe  
			{
				valor = parseFloat(valor_dato9);
				if( valor<9000 && valor>=0)
				{
					Valor=tablaFechas[NumeroFechaInteraccionActual].Valor=parseFloat(valor_dato9);
					console.log("["+NumeroFechaInteraccionActual+"] Dato "+tablaFechas[NumeroFechaInteraccionActual].Valor);
										
					break;
				}
			}
		}
		
		
		
	}
	
	
	// -------------------------------------------------------------
    if(NumeroFechaInteraccionActual>=NumeroFechaInteracciones-1) // hemos llegado al final de la busqueda de datos
	{
		
		BarraProgreso_avanza(  NumeroFechaInteraccionActual,  NumeroFechaInteracciones);
		var indice=0;
		var DatoResta=0;
		var valorInicial=0;
		// Inicializacion de los valores maximo y minimo de consumo
		ValorMaximo=0;
		ValorMinimo=99999999999;
		FechaValorMaximo="";
		FechaValorMinimo="";
		
		consumoTotal=0;
	
		var x = new Date();
		var currentTimeZoneOffsetInHours = x.getTimezoneOffset()/60;
		var offsetTime = 3600000*(currentTimeZoneOffsetInHours*-1);
	
		var valorIni=0;
		var valorFin=0;
		
		for( indice = 0;indice<=tablaFechas.length-2;indice++)
		{
			
			valorIni=tablaFechas[indice].Valor;
			valorFin=tablaFechas[indice+1].Valor;
			if(valorInicial==0 && valorIni!=0)
				valorInicial=valorIni;
			if(valorIni!=0)
			{
				//valorInicial=valorIni;
				DatoResta = valorFin-valorIni;
				
				if(DatoResta<0)
				{
					DatoResta=0;
				}
				
				lineChartData.data.push({x: tablaFechas[indice].FechaIni , y: DatoResta }); // se inserta el dato en la tabla ¡¡¡¡ al principio !!!!!
			
		
			}
		}
		
		
		
		$("div#divLoading").removeClass('show');
		
		pintaGraficoRango( lineChartData.data );
	}
	else // en caso de no estar al final se lanza de nuevo la llamada 
	{
		BarraProgreso_avanza(  NumeroFechaInteraccionActual,  NumeroFechaInteracciones);
		NumeroFechaInteraccionActual++;
		llamarServicioCarriotsFechaRango();
	}
	
		

 }   

 

// Realiza todas las funciones de visualizacion del panel de la izquierda en funcion de la tabla de datos 
function pintaPanelIzd(datos)
{
  var numeroFilas= datos.length;
  var indice=0;
  var registro=null;
   
  var  VMaximo=0;
  var  VMinimo=99999999999;
  var  FValorMaximo="";
  var  FValorMinimo="";
  var  VConsumoTotal=0;
 
  
  for(indice=0;indice<numeroFilas;indice++)
  {
	   registro=datos[indice];
	   VConsumoTotal+=registro.y;
		if(VMaximo<registro.y)
		{
			VMaximo=registro.y;
			FValorMaximo = DarFechaTexto(registro.x);

		}
		
		if(VMinimo>registro.y)
		{
			VMinimo=registro.y;
			FechaValorMinimo = DarFechaTexto(registro.x);
		}
  }

  VisualizaValoresPanelIzd(VMaximo
                           ,FValorMaximo 
						   ,VMinimo
						   ,FValorMinimo
						   ,VConsumoTotal
						   ,DarFechaTexto (datos[0].x)
						   ,DarFechaTexto(datos[datos.length-1].x)
						   );
  
  return;
  
}



 // ---------------------------------------------------------------------------------------------------------------

 function VisualizaValoresPanelIzd(ValorMaximo,FechaValorMaximo,ValorMinimo,FechaValorMinimo,TotalConsumo,strFechaInicio,strFechaFin)
 {
	var elem1=document.getElementById('ConsumoMaximo');
    elem1.innerHTML=ValorMaximo.toFixed(2) + " KwH";
	
	var Consumo;
	var CosteTotal;
	
	elem1=document.getElementById('fecha_consumomaximo');
    elem1.innerHTML=FechaValorMaximo;
	
	Consumo=ValorMaximo.toFixed(2) / 0.399
	elem1=document.getElementById('CarbonMaximo');
    elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	
	
	elem1=document.getElementById('ConsumoMinimo');
    elem1.innerHTML=ValorMinimo.toFixed(2) + " KwH";
	
	elem1=document.getElementById('fecha_consumominimo');
    elem1.innerHTML=FechaValorMinimo;
	
	Consumo=ValorMinimo.toFixed(2) / 0.399
	elem1=document.getElementById('CarbonMinimo');
    elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	elem1=document.getElementById('ConsumoTotal');
    elem1.innerHTML=TotalConsumo.toFixed(2) + " KwH";

	Consumo=TotalConsumo.toFixed(2) / 0.399
	elem1=document.getElementById('CarbonTotal');
    elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	CosteTotal=TotalConsumo.toFixed(2)*0.12;
	elem1=document.getElementById('CosteTotal');
    elem1.innerHTML="Coste : "+CosteTotal.toFixed(2) + " Eur.";
	
	elem1=document.getElementById('CabeceraGrafico');
    elem1.innerHTML=strFechaInicio+"<br/>"+strFechaFin;
 }
 
function pintaGrafico( data )
{
		BarraProgreso_Finaliza();
    	$('#bar_progreso').css('width', '0%');
		
		if(GData==null)
			GData=new Array();
		else
			GData.length=0;
	
		GData=data.slice();
		
		pintaPanelIzd(GData);
		
		var x = new Date();
		var currentTimeZoneOffsetInHours = x.getTimezoneOffset()/60;
        $('#grafico').highcharts({
			
			global:{
				useUTC:false
				
			},
			chart: {
                zoomType: 'x'
            },
            title: {
                text: TextoGrafico
            },
            /*subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },*/
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'KwH'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    
					turboThreshold:0
                }
            },
			
            series: [{
                type: 'area',
                name: 'Temperatura',
                data: data
            }]
        });
    
}    
  
  
// ----------------------------------------------------------------------------------
function pintaGraficoRango( data )
{
	BarraProgreso_Finaliza();
	
	if(GData==null)
		GData=new Array();
	else
		GData.length=0;
	
	GData=data.slice();
	
	pintaPanelIzd(GData);
	//pintaGrafico(GData);
	$('#bar_progreso').css('width', '0%');
    $('#grafico').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: TextoGrafico
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'KwH'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} kwh'
        },
		legend: {
                enabled: false
            },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
		
		series: [{
                type: 'area',
                name: 'Consumo',
                data: data
            }]
    });


}

// ----------------------------------------------------------------------------------  
function SacarConsolaFecha(fecha)
{
	var d = new Date (fecha);
	var FechaTexto = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()+':'+d.getMinutes();
	console.log(">"+fecha+"["+FechaTexto+"]\n");				
}

function BarraProgreso_reset()
{     
	$('#bar_progreso').css('width', '0%');
	var elem1=document.getElementById('barra_progreso');
    elem1.innerHTML=0+"%";
	$('#bar_progreso').show();
}

function BarraProgreso_Finaliza()
{     
	$('#bar_progreso').css('width', '100%');
	var elem1=document.getElementById('barra_progreso');
    elem1.innerHTML=100+"%";
	$('#bar_progreso').show();
}
function BarraProgreso_avanza(  valorActual,  valorFinal)
{
	//debugger;
	var step= Math.round((valorActual*100)/valorFinal);
	//
	//$('#bar_progreso').css("width: " + step+"%");
	//
	var elem1=document.getElementById('barra_progreso');
    elem1.innerHTML=step+"%";


	 $('#barra_progreso').css('width',step+'%');
     //$('#bar_progreso').text( step+'%');
    
   // bar.text(step + "%");
}

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

//Genera un objeto Blob con los datos en un archivo TXT
function generarTexto(datos) {
  var numeroFilas= datos.length;
  var indice=0;
  var registro=null;
  var texto = [];
  texto.push('FECHA;DATO\n');
  
  
   debugger;
  for(indice=0;indice<numeroFilas;indice++)
  {
	  registro=datos[indice];
	   var d = new Date (registro.x);
	   var FechaTexto = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()+':'+d.getMinutes();
	   texto.push(FechaTexto);
	   texto.push(";");
	 
	   texto.push(registro.y.toString().replace(/\./g,',') );
	   texto.push("\n");
  }


    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    return new Blob(texto, {
        type: 'text/plain'
    });
};

function DescargaDatos(obj)
{
	var x = new Date();
	
	var NombreFichero="salida"+x.getFullYear()+x.getMonth()+x.getDate()+x.getHours()+x.getMinutes()+x.getSeconds()+".csv";
    descargarArchivo(generarTexto(GData), NombreFichero); 
	
}
