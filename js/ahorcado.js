var jugando;
var errores  = 0;
var palabra  = "";
var imagenes = new Array( "imagenes/hangmagnet_0.jpg",
"imagenes/hangmagnet_1.jpg",
"imagenes/hangmagnet_2.jpg",
"imagenes/hangmagnet_3.jpg",
"imagenes/hangmagnet_4.jpg",
"imagenes/hangmagnet_5.jpg",
"imagenes/hangmagnet_6.jpg");

function obtenerPalabra() {

  //Obtener la palabra para jugar de forma pseudoaleatoria
  var diccionario = [ "programar", "java", "python", "diego",
  "angel", "chamorro",	"patxi", "natalia",
  "tatay", "sistemas", "javascript", "virtual",
  "memoria", "disco", "local", "conectar",
  "desconectar", "departamento", "internet", "senia",
  "paiporta", "chamorro", "enlace", "marcador",
  "ordenador", "lapiz", "ofimatica", "informe" ];

  var indice = Math.round ( Math.random() * diccionario.length );
  palabra    = diccionario[indice];
}

function cambiarMunyeco( errores ) {

  if (errores < 7){
    document.getElementById('munyeco').src = imagenes[errores];
  }
}

//Función que devuelve si exite la letra en la palabra... y la pinta
function existeLetra(letra) {

  //Indica si se encuentra la letra
  var existe = false

  //Obtener la cadena actual
  var cadena = new String(document.getElementById("palabraJuego").textContent)

  //Separar la cadena por espacios
  var letrasCadena = cadena.split(" ")

  cadena = "";
  for (var x = 0; x < palabra.length; x++) {

    //Si encuentra la letra en la palabra
    if (palabra[x] == letra) {
      cadena += letra + " "
      existe = true
    }
    else{
      cadena += letrasCadena[x] + " "
    }
  }

  //Mostrar la cadena en el HTML
  document.getElementById("palabraJuego").textContent = cadena;

  return existe;
}

//Comprobar si se completo toda la palabra
function haGanado() {

  var palabraCompleta = true;

  //Obtener cadena actual
  var cadena = new String(document.getElementById("palabraJuego").textContent);

  //Quitar espacios
  var letrasCadena = cadena.split(" ");

  for(var x = 0; x < letrasCadena.length; x++){

    if (letrasCadena[x] == "_"){
      palabraCompleta = false;
      break;
    }
  }

  return palabraCompleta;
}

function terminarJuego(resultado) {

  //Marcar que se ha terminado la partida
  jugando = false;

  //Mostrar al usuario si se ha perdido o ganado...
  if (resultado) {
    document.getElementById("haGanado").textContent = "YOU WIN !!";
  }
  else {
    document.getElementById("haGanado").textContent = "YOU LOSE !!";
    document.getElementById("solucionJuego").textContent = "La palabra era: " + palabra;
  }
}

function jugarLetra(letra) {

  //Comprobar si esta jugando...
  if (jugando) {

    //1.- Cambiar boton de color
    var boton = "boton" + letra;
    document.getElementById(boton).style.backgroundColor = '#FF6633';

    //2. Comprobar si existe la letra y Dibujar la letra en el XTML
    var existe = existeLetra( letra )

    //3. Si no existe la letra, cambiar munyeco
    if (!existe){
      cambiarMunyeco( ++errores );
    }

    //4. Compruebar si FIN de juego
    if (errores == 6){
      terminarJuego(false);
    }
    else{
      if (haGanado()){
        terminarJuego(true);
      }
    }
  }
  else {
    document.getElementById("pulsaEmpezar").textContent = "Para Jugar... Pulse aquí";
    document.getElementById('arriba').src 		          = "imagenes/arriba.png";
  }
}

function iniciarJuego() {

  //Inicializar Variables globales
  jugando = true;
  errores = 0;

  //Obtener palabra para jugar
  obtenerPalabra();

  //Mostrar munyeco inicial
  cambiarMunyeco( errores );

  //Inicializar textos HTML
  document.getElementById("palabraJuego").textContent  = "";
  document.getElementById("haGanado").textContent      = "";
  document.getElementById("solucionJuego").textContent = "";
  document.getElementById("pulsaEmpezar").textContent  = "";
  document.getElementById('arriba').src 				       = "imagenes/arriba_2.png";

  //Mostrar espacios de la palabra
  for (var x = 0; x < palabra.length; x++){
    document.getElementById("palabraJuego").textContent += "_ ";
  }

  //Cambiar color de todos los botones de las letras
  var abece = new Array("a","b","c","e","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
  var boton = "";
  for (var x = 0; x < abece.length; x++){
    boton = "boton" + abece[x];
    document.getElementById(boton).style.backgroundColor = '#4CAF50';
  }

}
