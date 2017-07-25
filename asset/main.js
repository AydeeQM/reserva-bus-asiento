var celdas = document.getElementsByTagName('td');
for (var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click',redirect,false);
}

//var numAsiento="";
var celdaActual;

function redirect(event){
    refrescar();
    document.getElementById("mostrar").innerHTML= (event.target.textContent);
    
    var num = parseInt(event.target.textContent);
    celdaActual = event.target;
    
    //numAsiento = event.target.textContent;
    
     for (var i =0; i<pasajeros.length;i++){ //fro para mostrar los datos despues de hacer click en el asiento íntado
        var obtiene = pasajeros[i];        
        var s = parseInt(obtiene.asiento);
        if(s === num){
            document.getElementById("nombre").value = obtiene.nombre;
            document.getElementById("apell").value = obtiene.apellido;
            document.getElementById("eldni").value = obtiene.iddni;
            
        }
    }
}

var pasajeros = []; //array que guarda los pasajeros reservados

var listando = document.getElementById('lista'); //contenedorpara imprimir la lista de pasajeros

function datos_Pasajero(asiento, nombre, apellido, iddni){ //funcion constructor para obtenr datos del pasajero
    this.asiento = asiento;
    this.nombre= nombre;
    this.apellido = apellido;
    this.iddni = iddni;
};

datos_Pasajero.prototype.toHTML = function(){ //Obtenendo datos del pasajero para adjuntar a la lista y mostrar
    var html = '';
    html += 'Asiento N° ' + this.asiento + '<br>';
    html += 'Nombre: ' + this.nombre + '<br>';
    html += 'Apellido: ' + this.apellido + '<br>';
    html += 'N° de DNI: ' + this.iddni + '<br>';
    html += '<br><br>';
    return html;
}

function mergeHTML(){
    var html = '';
    for (var i=0; i<pasajeros.length; i++){
        html += pasajeros[i].toHTML();
    }
    return html;
}

//funcion que imprimira el pasajero agregado
function printHTML (html){
  listando.innerHTML = '';
  listando.innerHTML = html;
}

//Funcion que reserva y/o agrega al pasajero
var addPas = document.getElementById('agregar');
addPas.onclick = function() {
    var asientos = document.getElementById("mostrar").textContent;
    var suNombre = document.getElementById("nombre");
    var suApellido = document.getElementById("apell");
    var numDNI = document.getElementById("eldni");
    suNombre = suNombre.value;
    suApellido = suApellido.value;
    numDNI = parseInt(numDNI.value);
        
  var datos = new datos_Pasajero(asientos, suNombre, suApellido, numDNI);
  pasajeros.push(datos);
  //printHTML(datos.toHTML());
    
    
    
 celdaActual.style.backgroundColor = '#F8ED50';
 alert('El pasajero ' + ' ' + datos.nombre + ' ' + datos.apellido + ' en el asiento N° ' + datos.asiento + ' se ha agregado correctamente');   

    refrescar();
};

//variable que motrara todos los pasajeros agregados
var printAll = document.getElementById('print');
    printAll.onclick = function() {
    printHTML(mergeHTML());
}

//funcion que limpia despues de reservar al pasajero
function refrescar(){
    document.getElementById("nombre").value = "";
    document.getElementById("apell").value = "";
    document.getElementById("eldni").value = "";
}

//funcion que busca pasajero por DNI
function buscar(){
    var buscarDni = document.getElementById("dni");
    buscarDni = parseInt(buscarDni.value);
    for (var i =0; i<pasajeros.length;i++){
        var obtiene = pasajeros[i];
        var s = obtiene.iddni;
        if(s==buscarDni){
            document.getElementById("nombre").value = obtiene.nombre;
            document.getElementById("apell").value = obtiene.apellido;
            document.getElementById("eldni").value = obtiene.iddni;
            
        }
    }
    
    refrescabuscar();
    
}

//funcion que limpia la casilla de buscr despues d eintroducir datos
function refrescabuscar(){
    document.getElementById("dni").value = "";
}

//funcion que limpia la consulta echa OK
function consulta(){
    refrescar();
}

//Funcion que elimina y libera el asiento
function cancela(){
    var  num = parseInt(document.getElementById("mostrar").textContent);
    
    for (var i =0; i<pasajeros.length;i++){
        var obtiene = pasajeros[i];
        var s = parseInt(obtiene.asiento);
        if(s === num){
            pasajeros[i] = datos_Pasajero('-1', '', '', -1);            
        }
    }
    
     celdaActual.style.backgroundColor = 'transparent';
    
    refrescar();

}