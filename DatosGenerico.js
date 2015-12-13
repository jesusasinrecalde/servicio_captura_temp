var TextoMeteo ;
function DatosGenerico(idTerm)
{
	"use strict";
	

	debugger;


	ObjectoGenerico.call(this,idTerm,1,"DatosGenerico","DatosGenerico",true,"#91FF83","#D6FFD1","#63AD5A","#669");
	
	this.Id=idTerm;
	//this.parametros={temperatura:35.5, modo:0,temperaturaAmbiente:30.5,ValvulaAbierta:0}; // datos que se recibe del servicio pass
	//this.configuracion={temperatura:35.5, modo:0, Caption:""}; // datos que se envia al servicio pass , son los que se modifican graficamente
	
		
	var clone = ObjectoGenerico.prototype.ClonaGenerico.call(this,'#DatosGenerico');
	
	// Elementos graficos propios del objeto
	clone.getElementById("marco_principal").id  ="marco_principal"+this.Id;
	
	
	$("#contenedor").append(clone); // se añade el objeto al documento DOM dentro del elemento contenedor ...
	
	
	
	ObjectoGenerico.prototype.ClonaGenerico_2.call(this);// ... una vez definido el objeto grafico al completo lo incluimos en la pagina 
	
	
	this.Actualizar();// Situamos la visualizacion al mismo nivel que el estado del objeto
	
};

DatosGenerico.prototype = Object.create(ObjectoGenerico.prototype); 

