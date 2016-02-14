var barChartData = {
		labels : [],
		datasets : [
			{
				//fillColor : "rgba(220,220,220,0.5)",
				fillColor : "rgba(115,216,61,0.75)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : []
			}
			//,
			//{
			//	fillColor : "rgba(151,187,205,0.5)",
			//	strokeColor : "rgba(151,187,205,0.8)",
			//	highlightFill : "rgba(151,187,205,0.75)",
			//	highlightStroke : "rgba(151,187,205,1)",
			//	data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			//}
		]

	}; 

/*	var barChartData = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				//fillColor : "rgba(220,220,220,0.5)",
				fillColor : "rgba(115,216,61,0.75)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			}
			//,
			//{
			//	fillColor : "rgba(151,187,205,0.5)",
			//	strokeColor : "rgba(151,187,205,0.8)",
			//	highlightFill : "rgba(151,187,205,0.75)",
			//	highlightStroke : "rgba(151,187,205,1)",
			//	data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			//}
		]

	}; 
*/

var TextoGrafico;
window.onload = function() {


debugger;
//var tipo = getUrlVars()["type"];
//var ObjId = getUrlVars()["id"];
//
//	var elem1=document.getElementById("dat6");
//    elem1.innerHTML="tipo" + tipo + " --> id "+ObjId;
	$("#btn_izddown").hide();
	$("#btn_dchdown").hide();
		
	

	$("#btn_24Horas").addClass('active');
    DarGrafico24horas();
}

function DarGrafico24horas()
{
	TextoGrafico="Consumo ultimas 24 horas"
	llamarServicioCarriotsNummObjt(144);
}

function DarGrafico48Horas()
{
	TextoGrafico="Consumo ultimas 48 horas"
	llamarServicioCarriotsNummObjt(288);
}

function DarGrafico7dias()
{
	TextoGrafico="Consumo ultimos 7 dias"
	llamarServicioCarriotsNummObjt(1008);
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
	DarGrafico24horas();
}
function EvntBtn7Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_7Dias").addClass('active');
	DarGrafico48Horas();

}

function EvntBtn30Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_30Dias").addClass('active');
	DarGrafico7dias();

}

function EvntBtn90Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_90Dias").addClass('active');
	
	
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
	
	
}



function randomScalingFactor(){ return Math.round(Math.random()*100)}

function llamarServicioCarriotsNummObjt(NumObjetos)
{

	var carriotsURL = 'http://api.carriots.com/devices/prueba@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max='+NumObjetos;

	//IdObjetoGlobal=idObjeto;
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey","ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713");

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

function recepcionServicioRESTNumObjetos (datosREST)
{
	debugger;
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
	
	var offset=0;
	if(numdatos>300 && numdatos<1000)
		offset=3;
	else if( numdatos<1000)
		offset=6;
	var salida= barChartData;
	// Se limpia las tablas -------------
	barChartData.datasets[0].data.length=0;
	barChartData.labels.length=0;
	// ----------------------------------
    debugger;
	var indice = numdatos-1;
	var nodo=datosREST.result[indice];
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
    // imprimir fecha y hora 
	var d = new Date ((nodo.at*1000)+60000);
	var stringFecha = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()
	      +':'+d.getMinutes();
	var ValorMaximo=0;
	var ValorMinimo=99999999999;
	var FechaValorMaximo;
	var FechaValorMinimo;
	var valor_dato9;
	valor_dato9=nodo.data['0_dat9'];
	var valor_inicial=null;
	var valor_inicio=null;
	var valor_final=null;
	var consumoTotal=0;
	if(valor_dato9!=null)
	{
		valor_inicial=parseFloat(nodo.data['0_dat9']);
		valor_inicio=parseFloat(nodo.data['0_dat9']);
		valor_final=parseFloat(datosREST.result[0].data['0_dat9']);
		consumoTotal=valor_final-valor_inicio;
	}
	
	var valor_dato;
	var lineChartData  = { data: []};
	var contadoroffset=0;
	var dato_resta=0;
	
	for(indice =numdatos-2;indice>0;indice--)
	{
		if(offset==contadoroffset)
		{
			nodo=datosREST.result[indice];
			valor_dato9=nodo.data['0_dat9'];
			if(valor_dato9!=null)
			{
				if(valor_inicial==null)
				{
					debugger;
					valor_inicial=parseFloat(nodo.data['0_dat9']);
					valor_inicio=parseFloat(nodo.data['0_dat9']);
					valor_final=parseFloat(datosREST.result[0].data['0_dat9']);
					consumoTotal=valor_final-valor_inicio;
				}
				debugger;
				valor_dato=parseFloat(nodo.data['0_dat9']);
				//d=new Date(nodo.at*1000);
				//stringFecha = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()
				//  +':'+d.getMinutes();
		
				//barChartData.datasets[0].data.push(valor_dato.toFixed(2)-valor_inicial.toFixed(2));
				//barChartData.labels.push(stringFecha);
				dato_resta=valor_dato-valor_inicial;
				lineChartData.data.push({x: (nodo.at*1000)+60000 , y: valor_dato-valor_inicial });
				if(ValorMaximo<(valor_dato-valor_inicial))
				{
					ValorMaximo=valor_dato-valor_inicial;
					FechaValorMaximo=stringFecha;
				}
		
				if(ValorMinimo>(valor_dato-valor_inicial))
				{
					ValorMinimo=valor_dato-valor_inicial;
					FechaValorMinimo=stringFecha;
				}
		
				valor_inicial=parseFloat(nodo.data['0_dat9']);
				contadoroffset=0;
			}
		}
		else
		{
			contadoroffset++;
		}
	}
	
	// Visualizamos el grafico
	/*var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Line(barChartData	, {
			 bezierCurve : true
			 ,pointDot : false
			 
		});
	*/	
	var elem1=document.getElementById('ConsumoMaximo');
    elem1.innerHTML=ValorMaximo.toFixed(2) + " KwH";
	
	var Consumo;
	
	
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
    elem1.innerHTML=consumoTotal.toFixed(2) + " KwH";

	Consumo=consumoTotal.toFixed(2) / 0.399
	elem1=document.getElementById('CarbonTotal');
    elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	pintaGrafico(lineChartData.data);
		
		/*new Chart(ctx).Bar(barChartData, {
			responsive : true
		
		});
		*/
	//var obj=DarObjeto(IdObjetoGlobal);
	//if(obj)
	//	obj.ProcesaDatosPeticion(datosREST);
	
	
}

function pintaGrafico( data )
{
    	debugger;
        $('#grafico').highcharts({
			
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
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Temperatura',
                data: data
            }]
        });
    
}    
  
