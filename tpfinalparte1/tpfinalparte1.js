/*ALEJANDRO TAMAYO - LEGAJO 122913/2 - DOCUMENTO 82224120
AGUSTÍN RUIZ - LEGAJO 122879/8 - DOCUMENTO 43912182
LINK A YOUTUBE TP1 - https://www.youtube.com/watch?v=QuPQuYTCEVs */

let pantalla = 0;
let musica;
let textos = [];
let imagenes = {};

function preload() {
  musica = loadSound("resources/music.mp3");
  imagenes.pantalla0 = loadImage("img/pantalla0.png");
  imagenes.pantalla1 = loadImage("img/pantalla1.png");
  imagenes.pantalla2 = loadImage("img/pantalla2.png");
  imagenes.pantalla3 = loadImage("img/pantalla-espada.png");
  imagenes.pantalla4 = loadImage("img/pantalla3.png");
  imagenes.pantalla5 = loadImage("img/pantalla-primerfinal.png");
  imagenes.pantalla6 = loadImage("img/pantalla4.png");
  imagenes.pantalla7 = loadImage("img/pantalla5.png");
  imagenes.pantalla8 = loadImage("img/pantalla6.png");
  imagenes.pantalla9 = loadImage("img/pantalla7.png");
  imagenes.pantalla10 = loadImage("img/pantalla-hidra.png");
  imagenes.pantalla11 = loadImage("img/final2.png");
  imagenes.pantalla12 = loadImage("img/pantalla9.png");
  imagenes.pantalla13 = loadImage("img/creditos.png");
}

function setup() {
  createCanvas(640, 480);
  textSize(20);
  textAlign(CENTER, CENTER);

  textos = [
    "START: Haz clic para comenzar la aventura de Hércules",
    "Hércules busca redimirse. El oráculo le encomienda dos desafíos.",
    "Primer desafío: el león de Nemea. ¿Cómo lo enfrentas?",
    "Usaste la espada, pero no le hace daño...",
    "Usaste tus manos y derrotaste al león.",
    "FINAL 1: Hércules escapa herido. Volverá a intentarlo.",
    "Victorioso, Hércules avanza al segundo desafío.",
    "Segundo desafío: la hidra de Lerna. ¿Cómo la enfrentas?",
    "Usaste fuego y venciste a la hidra.",
    "Cortaste rápido, pero las cabezas se regeneraron.",
    "FINAL 2: Hércules cae ante la hidra.",
    "Desafíos superados. Hércules regresa redimido.",
    "FINAL BUENO: Hércules se convierte en semidios inmortal.",
    "\nProyecto de Agustín LEGAJO 122879/8 - DOCUMENTO 43912182 \n Alejandro LEGAJO 122913/2 - DOCUMENTO 82224120. Año 2025."
  ];
}

function draw() {
  musica.setVolume(0.1);
  background(200);
  switch(pantalla) {
    case 0:
      if (imagenes.pantalla0) image(imagenes.pantalla0, 0, 0, width, height);
      break;
    case 1:
      if (imagenes.pantalla1) image(imagenes.pantalla1, 0, 0, width, height);
      break;
    case 2:
      if (imagenes.pantalla2) image(imagenes.pantalla2, 0, 0, width, height);
      break;
    case 3:
      if (imagenes.pantalla3) image(imagenes.pantalla3, 0, 0, width, height);
      break;
    case 4:
      if (imagenes.pantalla3) image(imagenes.pantalla4, 0, 0, width, height);
      break;
    case 5:
      if (imagenes.pantalla5) image(imagenes.pantalla5, 0, 0, width, height);
      break;
    case 6:
      if (imagenes.pantalla6) image(imagenes.pantalla6, 0, 0, width, height);
      break;
    case 7:
      if (imagenes.pantalla7) image(imagenes.pantalla7, 0, 0, width, height);
      break;
    case 8:
      if (imagenes.pantalla8) image(imagenes.pantalla8, 0, 0, width, height);
      break;
    case 9:
      if (imagenes.pantalla9) image(imagenes.pantalla9, 0, 0, width, height);
      break;
    case 10:
      if (imagenes.pantalla10) image(imagenes.pantalla10, 0, 0, width, height);
      break;
    case 11:
      if (imagenes.pantalla11) image(imagenes.pantalla11, 0, 0, width, height);
      break;
    case 12:
      if (imagenes.pantalla12) image(imagenes.pantalla12, 0, 0, width, height);
      break;
    case 13:
      if (imagenes.pantalla13) image(imagenes.pantalla13, 0, 0, width, height);
      break;
  }
  
  fill(0, 0, 0, 150);
  rect(0, 50, width, 100);
  fill(255);
  text(textos[pantalla], width / 2, 100);

  // Botones por pantalla
  if (pantalla === 0) {
    dibujarBoton(width / 2 - 60, 400, "Comenzar", 1);
  }

  if (pantalla === 1) {
    dibujarBoton(width / 2 - 60, 400, "Ir al desafío 1", 2);
  }

  if (pantalla === 2) {
    dibujarBoton(100, 400, "Usar espada", 3);
    dibujarBoton(width - 220, 400, "Usar manos", 4);
  }

  if (pantalla === 3) {
    dibujarBoton(width / 2 - 60, 400, "Continuar", 5);
  }

  if (pantalla === 4) {
    dibujarBoton(width / 2 - 60, 400, "Continuar", 6);
  }

  if (pantalla === 5) {
    dibujarBoton(100, 400, "Reiniciar", 0);
    dibujarBoton(width - 220, 400, "Créditos", 13);
  }

  if (pantalla === 6) {
    dibujarBoton(width / 2 - 60, 400, "Ir al desafío 2", 7);
  }

  if (pantalla === 7) {
    dibujarBoton(100, 400, "Fuego y paciencia", 8);
    dibujarBoton(width - 220, 400, "Cortar rápido", 9);
  }

  if (pantalla === 8) {
    dibujarBoton(width / 2 - 60, 400, "Continuar", 11);
  }

  if (pantalla === 9) {
    dibujarBoton(width / 2 - 60, 400, "Continuar", 10);
  }

  if (pantalla === 10) {
    dibujarBoton(100, 400, "Reiniciar", 0);
    dibujarBoton(width - 220, 400, "Créditos", 13);
  }

  if (pantalla === 11) {
    dibujarBoton(width / 2 - 60, 400, "Final", 12);
  }

  if (pantalla === 12) {
    dibujarBoton(100, 400, "Reiniciar", 0);
    dibujarBoton(width - 220, 400, "Créditos", 13);
  }

  if (pantalla === 13) {
    dibujarBoton(width / 2 - 60, 400, "Volver al inicio", 0);
  }
}

function dibujarBoton(x, y, texto, destino) {
  fill(180);
  rect(x, y, 120, 40, 10);
  fill(0);
  text(texto, x + 60, y + 20);
}

function mousePressed() {
  userStartAudio();
  if (!musica.isPlaying()) musica.loop();
  // Botones por pantalla
  if (pantalla === 0 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 1;
  else if (pantalla === 1 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 2;
  else if (pantalla === 2 && mouseEnBoton(100, 400)) pantalla = 3;
  else if (pantalla === 2 && mouseEnBoton(width - 220, 400)) pantalla = 4;
  else if (pantalla === 3 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 5;
  else if (pantalla === 4 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 6;
  else if (pantalla === 5 && mouseEnBoton(100, 400)) pantalla = 0;
  else if (pantalla === 5 && mouseEnBoton(width - 220, 400)) pantalla = 13;
  else if (pantalla === 6 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 7;
  else if (pantalla === 7 && mouseEnBoton(100, 400)) pantalla = 8;
  else if (pantalla === 7 && mouseEnBoton(width - 220, 400)) pantalla = 9;
  else if (pantalla === 8 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 11;
  else if (pantalla === 9 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 10;
  else if (pantalla === 10 && mouseEnBoton(100, 400)) pantalla = 0;
  else if (pantalla === 10 && mouseEnBoton(width - 220, 400)) pantalla = 13;
  else if (pantalla === 11 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 12;
  else if (pantalla === 12 && mouseEnBoton(100, 400)) pantalla = 0;
  else if (pantalla === 12 && mouseEnBoton(width - 220, 400)) pantalla = 13;
  else if (pantalla === 13 && mouseEnBoton(width / 2 - 60, 400)) pantalla = 0;
}

function mouseEnBoton(x, y) {
  return mouseX > x && mouseX < x + 120 &&
         mouseY > y && mouseY < y + 40;
}
