var TextoMeteo ;

function Altherma(idTerm)
{
	"use strict";
	

	debugger;


	ObjectoGenerico.call(this,idTerm,1,"Altherma","Altherma"+idTerm,false,"#91FF83","#D6FFD1","#370EC8","#669");
	
	this.Id=idTerm;
	
	/*
	[1] I0021 Unit ERROR 0..1 (0:No Error, 1:Error)
	[2] I0022 Unit ERROR Code RTD ASCII Format*
	[3] I0023 Unit ERROR Sub Code 0-99
	[4] I0028 Emergency Operation 0..1 (0:Off, 1:On)
	[5] I0029 ADD Zone Running 0..1 (0:Off, 1:On)
	[6] I0030 Circulation pump operation 0..1 (0:Off, 1:On)
	[7] I0031 Compressor Run 0..1 (0:Off, 1:On)
	[8] I0032 Booster Heater Run† 0..1 (0:Off, 1:On)
	[9] I0033 Disinfection operation 0..1 (0:Off, 1:Busy)
	[10] I0034 Backup Heater Level 1,2† 0..2 (0:Off, 1,2: Level)
	[11] I0035 Defrost/start up mode 0..1 (0:Off, 1:Busy)
	[12] I0036 Hot Start 0..1 (0:Off, 1:Busy)
	[13] I0037 3-Way Valve 0..1 (0:Space Heat/Cool, 1: DHW)
	[14] I0040 Leaving Water Temperature °C x100 Temperature
	[15] I0041 Leaving Water Temperature PHE °C x100 Temperature
	[16] I0042 Inlet Water Temperature °C x100 Temperature
	[17] I0043 Domestic Hot Water Temperature†
	[18] I0044 Outside Air Temperature °C x100 Temperature
	[19] I0045 Liquid Refrigerant Temperature °C x100 Temperature
	[20] I0046 Current Leaving Water Temperature MAIN Setpoint °C x100 Temperature
	[21] I0047 Current Leaving Water Temperature ADD Setpoint† °C x100 Temperature
	[22] I0048 External Sensor °C x100 Temperature
	[23] I0049 Flow Rate litre/s x100
	[24] I0050 Measured Room Temperature °C x100 Temperature
	[25] I0051 Current DHW Setpoint °C x100 Temperature
*/	
	this.parametros={dat1:0, dat2:0 ,dat3: 0,dat4: 0,dat5: 0,dat6:0
						   , dat7: 0,dat8: 0,dat9: 0,dat10:0,dat11:0,dat12:0,dat13:0
					       , dat14:0,dat15:0,dat16:0,dat17:0
					       , dat18:0,dat19:0,dat20:0,dat21:0,dat22:0,dat23:0,dat24:0,dat25:0}; // datos que se recibe del servicio pass
	//this.configuracion={temperatura:35.5, modo:0, Caption:""}; // datos que se envia al servicio pass , son los que se modifican graficamente
	//this.ConsumoHora=new Array(6);
		
	var clone = ObjectoGenerico.prototype.ClonaGenerico.call(this,'#Altherma');
	debugger;
	// Elementos graficos propios del objeto
	clone.getElementById("TempExterior").id ="TempExterior"+this.Id;
	clone.getElementById("marco_principal").id  ="marco_principal"+this.Id;
	
	//Elementos que van los datos de consumo
	clone.getElementById("dat16").id ="dat16"+this.Id;
	clone.getElementById("dat6").id ="dat6"+this.Id;
	//clone.getElementById("dat3").id ="dat3"+this.Id;
	//clone.getElementById("dat4").id ="dat4"+this.Id;
	//clone.getElementById("dat5").id ="dat5"+this.Id;
	//clone.getElementById("dat6").id ="dat6"+this.Id;
	//clone.getElementById("dat7").id ="dat7"+this.Id;
	//clone.getElementById("dat8").id ="dat8"+this.Id;
	//clone.getElementById("dat9").id ="dat9"+this.Id;
	clone.getElementById("dat14").id ="dat14"+this.Id;
	
	clone.getElementById("icono_warning").id ="icono_warning"+this.Id;
	
	
	
	
	
	$("#contenedor").append(clone); // se añade el objeto al documento DOM dentro del elemento contenedor ...
	
	
	ObjectoGenerico.prototype.ClonaGenerico_2.call(this);// ... una vez definido el objeto grafico al completo lo incluimos en la pagina 
	
	//llamarServicioCarriotsNummObjt(this.Id,6);
	
	this.Actualizar();// Situamos la visualizacion al mismo nivel que el estado del objeto
	
};

Altherma.prototype = Object.create(ObjectoGenerico.prototype); 

/** centraliza en una una funcion todas los cambios que se produce en el objeto 
*/

Altherma.prototype.Actualizar=function()
{
	//var elem1=document.getElementById('dat1'+this.Id);
    //elem1.innerHTML=this.parametros.dat1+" V";
	
	//elem1=document.getElementById('dat2'+this.Id);
    //elem1.innerHTML=this.parametros.dat2+" A";
	
	////elem1=document.getElementById('dat3'+this.Id);
    ////elem1.innerHTML=this.parametros.dat3;
	
	////elem1=document.getElementById('dat4'+this.Id);
    ////elem1.innerHTML=this.parametros.dat4+ " W";
	
	//elem1=document.getElementById('dat5'+this.Id);
    //elem1.innerHTML=this.parametros.dat5 + " W";
	

	
	
	//var Consumo=this.parametros.dat9 / 0.399;
	elem1=document.getElementById('icono_warning'+this.Id);
	if(this.parametros.dat1==0)
		$('#icono_warning'+this.Id).hide();
	else
		$('#icono_warning'+this.Id).show();
	
	
	
	elem1=document.getElementById('TempExterior'+this.Id);
    elem1.innerHTML=this.parametros.dat18.toFixed(2) + " ºC";
	
	//elem1=document.getElementById('dat9'+this.Id);
    //elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	
	elem1=document.getElementById('dat14'+this.Id);
    elem1.innerHTML=this.parametros.dat14.toFixed(2) + " ºC";
	
	
	elem1=document.getElementById('dat16'+this.Id);
    elem1.innerHTML=this.parametros.dat16.toFixed(2) + " ºC";

	elem1=document.getElementById('dat6'+this.Id);
	if(this.parametros.dat6==0)
		elem1.innerHTML= "OFF";
	else
		elem1.innerHTML= "ON";
	
	////elem1=document.getElementById('dat6'+this.Id);
    ////elem1.innerHTML=this.parametros.dat6 +" var";
	
	
	
	////elem1=document.getElementById('dat7'+this.Id);
    ////elem1.innerHTML=this.parametros.dat7+ " VA";
	
	////elem1=document.getElementById('dat8'+this.Id);
    ////elem1.innerHTML=this.parametros.dat8 +" VA";
	
	
	
	
	
	ObjectoGenerico.prototype.Actualizar.call(this);
	
	
}


/** Funcion de procesamiento de datos recibido, 
*/
Altherma.prototype.ProcesaDatos=function(Parametros)
{
	console.log("Actualizar datos Obj tipo 2 Id"+this.Id+"\n");
	
	//var dato=Parametros.data[this.Id+'_dat1'];
	//if(dato!=null)
	//{
	//	this.parametros.dat1=parseFloat(dato);
	//}

	dato=Parametros.data[this.Id+'_dat1'];
	if(dato!=null)
	{
		this.parametros.dat0=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat7'];
	if(dato!=null)
	{
		this.parametros.dat6=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat14'];
	if(dato!=null)
	{
		this.parametros.dat14=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat16'];
	if(dato!=null)
	{
		this.parametros.dat16=parseFloat(dato);
	}

	
	dato=Parametros.data[this.Id+'_dat18'];
	if(dato!=null)
	{
		this.parametros.dat18=parseFloat(dato);
	}

	
	//dato=Parametros.data[this.Id+'_dat5'];
	//if(dato!=null)
	//{
	//	this.parametros.dat5=parseFloat(dato);
	//}
	
	//dato=Parametros.data[this.Id+'_dat9'];
	////alert ("recibido " +dato);
	//if(dato!=null)
	//{
	//	
	//	this.parametros.dat9=parseFloat(dato);
	//	//alert ("recibido 1 " +this.parametros.dat9);
	//}
	this.Actualizar();
	
	return;
}


/** Funcion generica para mostrar el grafico , sin sobrecargar no muestra el formulario
*/
Altherma.prototype.MostrarGraph=function()
{
	//window.open ('graph.html?type=1&id='+this.Id,'_self',false);
}


Altherma.prototype.ProcesaDatosPeticion=function(ListaResultado)
{
	//var indice =0;
	//var numdatos = ListaResultado.result.length;
	//var nodo;
	//var dato;
	//debugger;
	//for(indice=0;indice<numdatos;indice++)
	//{
	//	nodo=ListaResultado.result[indice];
	//	dato=nodo.data[this.Id+'_dat9'];
	//	if(dato!=null)
	//	{
	//		this.ConsumoHora[indice]=parseFloat(dato);
	//	}
	//}
	
	//this.parametros.dat9=this.ConsumoHora[0]-this.ConsumoHora[5];
	//this.Actualizar();
	////alert("recibidor :"+ListaResultado.total_documents);
	//debugger;
	return;
}