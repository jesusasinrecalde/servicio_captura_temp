var g_key;
var g_device;
window.onload = function() {
	//$("div#login-modal").addClass('show');
	$('#login-modal').modal('show');
	debugger;
	var param_key = getUrlVars()["key"];
	var param_device = getUrlVars()["device"];
	var tabla = document	.forms[0];
	g_key="";
	g_device="";
	if(param_key!=null)
	{
		tabla.elements[0].value=param_key;
		//$('#key').value=param_key;

	}
	
	if(param_device!=null)
	{
			tabla.elements[1].value=param_device;
	}
}

function clickRegister(obj)
{
		debugger;
		var tabla = document.forms[0];
		//var valor = $('#key').val();
		g_key=tabla.elements[0].value;
		g_device=tabla.elements[1].value;
		
		llamarServicioCarriots(tabla.elements[0].value,tabla.elements[1].value);
		//llamarServicioCarriots(tabla.elements[0].value,tabla.elements[1].value);
		
		
}


function llamarServicioCarriots(clave , dispositivo)
{
	debugger;
	$("div#divLoading").addClass('show');
	//"ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713"
	//var carriotsURL = 'http://api.carriots.com/devices/prueba1@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max=1';
	
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",clave);
    	
		},
    type : "GET",
    url: "http://api.carriots.com/devices/"+dispositivo+"/streams/?order=-1&max=1",
    success: recepcionServicioREST,
    error : falloServicioREST
	});
	

}

function falloServicioREST (jqXHR, status)
{
	$("div#divLoading").removeClass('show');
	
	
}
function  recepcionServicioREST (datosREST)
{
	$("div#divLoading").removeClass('show');
	localStorage["hjm_key"] = g_key;
	localStorage["hjm_device"] = g_device;
	window.open ('tabla.html','_self',false);
	//alert(' OK ' );
	
}

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