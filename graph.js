

window.onload = function() {


debugger;
var tipo = getUrlVars()["type"];
var ObjId = getUrlVars()["id"];

	var elem1=document.getElementById("dat6");
    elem1.innerHTML="tipo" + tipo + " --> id "+ObjId;
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