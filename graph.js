var barChartData = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				//fillColor : "rgba(220,220,220,0.5)",
				fillColor : "rgba(115,216,61,0.75)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			}
		]

	}; 

window.onload = function() {


debugger;
//var tipo = getUrlVars()["type"];
//var ObjId = getUrlVars()["id"];
//
//	var elem1=document.getElementById("dat6");
//    elem1.innerHTML="tipo" + tipo + " --> id "+ObjId;
	$("#btn_izddown").hide();
	$("#btn_dchdown").hide();
		
	var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true
		});

	$("#btn_24Horas").addClass('active');
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

