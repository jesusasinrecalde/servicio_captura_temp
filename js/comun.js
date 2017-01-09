
function pad (n, length) {
    var  n = n.toString();
    while(n.length < length)
         n = "0" + n;
	return n;
}

// Devuelve la fecha en formato texto de un fecha en formato numero 
function DarFechaTexto(fecha)
{
	var d = new Date (fecha);

	return  d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+pad(d.getUTCHours(),2)+':'+pad(d.getMinutes(),2);
	  	
}

// Devuelve la fecha en formato texto corto de un fecha en formato numero 
function DarFechaTextoCorta(fecha)
{
	var d = new Date (fecha);

	return  d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear();
	  	
}