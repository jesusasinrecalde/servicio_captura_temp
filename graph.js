

window.onload = function() {


debugger;
//var tipo = getUrlVars()["type"];
//var ObjId = getUrlVars()["id"];
//
//	var elem1=document.getElementById("dat6");
//    elem1.innerHTML="tipo" + tipo + " --> id "+ObjId;
	$("#btn_izddown").hide();
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