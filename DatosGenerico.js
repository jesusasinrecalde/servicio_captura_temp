var TextoMeteo ;
function DatosGenerico(idTerm)
{
	"use strict";
	

	debugger;


	ObjectoGenerico.call(this,idTerm,1,"Consumo","Consumo"+idTerm,false,"#91FF83","#D6FFD1","#63AD5A","#669");
	
	this.Id=idTerm;
	this.parametros={dat1:35.5, dat2:0,dat3:30.5,dat4:0,dat5:0,dat6:0,dat7:0,dat8:0}; // datos que se recibe del servicio pass
	//this.configuracion={temperatura:35.5, modo:0, Caption:""}; // datos que se envia al servicio pass , son los que se modifican graficamente
	
		
	var clone = ObjectoGenerico.prototype.ClonaGenerico.call(this,'#DatosGenerico');
	
	// Elementos graficos propios del objeto
	clone.getElementById("marco_principal").id  ="marco_principal"+this.Id;
	
	//Elementos que van los datos de consumo
	clone.getElementById("dat1").id ="dat1"+this.Id;
	clone.getElementById("dat2").id ="dat2"+this.Id;
	clone.getElementById("dat3").id ="dat3"+this.Id;
	clone.getElementById("dat4").id ="dat4"+this.Id;
	clone.getElementById("dat5").id ="dat5"+this.Id;
	clone.getElementById("dat6").id ="dat6"+this.Id;
	clone.getElementById("dat7").id ="dat7"+this.Id;
	clone.getElementById("dat8").id ="dat8"+this.Id;
	
	clone.getElementById("icono_graph").id ="icono_graph"+this.Id;
	
	
	
	$("#contenedor").append(clone); // se añade el objeto al documento DOM dentro del elemento contenedor ...
	
	document.getElementById("icono_graph"+this.Id).setAttribute( "IdTerm",this.Id.toString());
	
	ObjectoGenerico.prototype.ClonaGenerico_2.call(this);// ... una vez definido el objeto grafico al completo lo incluimos en la pagina 
	
	
	this.Actualizar();// Situamos la visualizacion al mismo nivel que el estado del objeto
	
};

DatosGenerico.prototype = Object.create(ObjectoGenerico.prototype); 

/** centraliza en una una funcion todas los cambios que se produce en el objeto 
*/

DatosGenerico.prototype.Actualizar=function()
{
	var elem1=document.getElementById('dat1'+this.Id);
    elem1.innerHTML=this.parametros.dat1+" V";
	
	elem1=document.getElementById('dat2'+this.Id);
    elem1.innerHTML=this.parametros.dat2+" A";
	
	elem1=document.getElementById('dat3'+this.Id);
    elem1.innerHTML=this.parametros.dat3;
	
	elem1=document.getElementById('dat4'+this.Id);
    elem1.innerHTML=this.parametros.dat4+ " W";
	
	elem1=document.getElementById('dat5'+this.Id);
    elem1.innerHTML=this.parametros.dat5 + " W";
	
	elem1=document.getElementById('dat6'+this.Id);
    elem1.innerHTML=this.parametros.dat6 +" var";
	
	elem1=document.getElementById('dat7'+this.Id);
    elem1.innerHTML=this.parametros.dat7+ " VA";
	
	elem1=document.getElementById('dat8'+this.Id);
    elem1.innerHTML=this.parametros.dat8 +" VA";
	
	
	
	
	
	ObjectoGenerico.prototype.Actualizar.call(this);
	
	
}


/** Funcion de procesamiento de datos recibido, 
*/
DatosGenerico.prototype.ProcesaDatos=function(Parametros)
{
	
	var dato=Parametros.data[this.Id+'_dat1'];
	if(dato!=null)
	{
		this.parametros.dat1=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat2'];
	if(dato!=null)
	{
		this.parametros.dat2=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat3'];
	if(dato!=null)
	{
		this.parametros.dat3=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat4'];
	if(dato!=null)
	{
		this.parametros.dat4=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat5'];
	if(dato!=null)
	{
		this.parametros.dat5=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat6'];
	if(dato!=null)
	{
		this.parametros.dat6=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat7'];
	if(dato!=null)
	{
		this.parametros.dat7=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat8'];
	if(dato!=null)
	{
		this.parametros.dat8=parseFloat(dato);
	}
	
	this.Actualizar();
	
	return;
}


/** Funcion generica para mostrar el grafico , sin sobrecargar no muestra el formulario
*/
DatosGenerico.prototype.MostrarGraph=function()
{
		alert ("hola hola");
}
