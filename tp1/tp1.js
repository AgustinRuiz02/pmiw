/*
TP1 PMIW Comisión 3
Nombre: David Agustín Ruiz
DNI: 43912182
*/


let imagen;
let lado = 71; // Tamaño del rombo
let distanciaX = lado * Math.sqrt(2);
let distanciaY = lado * Math.sqrt(2) / 2;
let factorEscala = 1.414;
let coloresAleatorios = false;
let semillaColor = 0;
let filaSeleccionada = -1;
let columnaSeleccionada = -1;
let desplazamientoX = 0;
let desplazamientoY = 0;
let posicionOriginalX = 0;
let posicionOriginalY = 0;

function preload() {
  imagen = loadImage('data/imagen.jpeg'); 
}

function setup() {
  createCanvas(800, 400);
  
  // Centrar el canvas
  let body = select('body');
  body.style('display', 'flex');
  body.style('justify-content', 'center');
  body.style('align-items', 'center');
  body.style('min-height', '100vh');
}

function draw() {
  background(255);
  noStroke();
  

  // Dibuja los rombos
  for (let fila = 0; fila < 9; fila++) {
    let numRombos = (fila % 2 === 0) ? 5 : 4;
    let offsetFila = (fila % 2 === 1) ? distanciaX / 2 : 0;
    let y = fila * distanciaY;

    for (let col = 0; col < numRombos; col++) {
      if (fila !== filaSeleccionada || col !== columnaSeleccionada) {
        let x = col * distanciaX + offsetFila + 400;
        let colorInicial;
        if (fila % 2 === 0) {
          colorInicial = ((Math.floor(fila / 2) + col) % 2 === 0) ? 0 : 255;
        } else {
          colorInicial = ((Math.floor((fila - 1) / 2) + col) % 2 === 0) ? 0 : 255;
        }
        dibujarRombo(x, y, colorInicial, fila % 2 === 0, fila, col);
      }
    }
  }

  image(imagen, 0, 0, 400, 400);

  // Dibuja el rombo seleccionado y la línea
  if (filaSeleccionada !== -1 && columnaSeleccionada !== -1) {
    let x = mouseX + desplazamientoX;
    let y = mouseY + desplazamientoY;
    let colorInicial;
    if (filaSeleccionada % 2 === 0) {
      colorInicial = ((Math.floor(filaSeleccionada / 2) + columnaSeleccionada) % 2 === 0) ? 0 : 255;
    } else {
      colorInicial = ((Math.floor((filaSeleccionada - 1) / 2) + columnaSeleccionada) % 2 === 0) ? 0 : 255;
    }
    stroke(0);
    line(posicionOriginalX, posicionOriginalY, x, y);
    noStroke();
    dibujarRombo(x, y, colorInicial, filaSeleccionada % 2 === 0, filaSeleccionada, columnaSeleccionada);

    // Muestra la distancia
    let distancia = dist(x, y, posicionOriginalX, posicionOriginalY);
    fill(100, 100, 100, 220);
    rect(630, 5, 400, 20);
    fill(255);
    textAlign(RIGHT, TOP);
    textSize(16);
    text("Distancia: " + nf(distancia, 0, 1) + " px", 780, 10);
  }
}

function dibujarRombo(x, y, colorInicial, esHorizontal, fila, col) {
  push();
  translate(x, y);
  rotate(radians(45));
  fill(255);
  rect(-lado / 2, -lado / 2, lado, lado);
  pop();

  // Dibuja las franjas alternadas
  push();
  translate(x, y);

  for (let i = 0; i < 12; i++) {
    let colorBase = (colorInicial + i % 2 * 255) % 510;
    if (coloresAleatorios && colorBase === 255) {
      randomSeed(semillaColor + i + fila * 100 + col * 1000);
      fill(obtenerColorAleatorio(i));
    } else {
      fill(colorBase === 0 ? color(35, 35, 35) : colorBase);
    }

    let t1 = -lado / 2 * factorEscala + i * lado * factorEscala / 12;
    let t2 = -lado / 2 * factorEscala + (i + 1) * lado * factorEscala / 12;

    if (esHorizontal) {
      let y1 = t1;
      let y2 = t2;
      let x1_sup = -lado / 2 * factorEscala * (1 - Math.abs(y1) / (lado / 2 * factorEscala));
      let x2_sup = lado / 2 * factorEscala * (1 - Math.abs(y1) / (lado / 2 * factorEscala));
      let x1_inf = -lado / 2 * factorEscala * (1 - Math.abs(y2) / (lado / 2 * factorEscala));
      let x2_inf = lado / 2 * factorEscala * (1 - Math.abs(y2) / (lado / 2 * factorEscala));

      beginShape();
      vertex(x1_sup, y1);
      vertex(x2_sup, y1);
      vertex(x2_inf, y2);
      vertex(x1_inf, y2);
      endShape(CLOSE);
    } else {
      let x1 = t1;
      let x2 = t2;
      let y1_izq = -lado / 2 * factorEscala * (1 - Math.abs(x1) / (lado / 2 * factorEscala));
      let y2_izq = lado / 2 * factorEscala * (1 - Math.abs(x1) / (lado / 2 * factorEscala));
      let y1_der = -lado / 2 * factorEscala * (1 - Math.abs(x2) / (lado / 2 * factorEscala));
      let y2_der = lado / 2 * factorEscala * (1 - Math.abs(x2) / (lado / 2 * factorEscala));

      beginShape();
      vertex(x1, y1_izq);
      vertex(x2, y1_der);
      vertex(x2, y2_der);
      vertex(x1, y2_izq);
      endShape(CLOSE);
    }
  }
  pop();
}

function obtenerColorAleatorio(indice) {
  let dominante = int(random(3));
  let r = (dominante === 0) ? random(200, 255) : random(0, 255);
  let g = (dominante === 1) ? random(200, 255) : random(0, 255);
  let b = (dominante === 2) ? random(200, 255) : random(0, 255);
  return color(r, g, b);
}

function mousePressed() {
  let menorDistancia = Infinity;
  let filaCercana = -1;
  let colCercana = -1;
  let despX = 0;
  let despY = 0;
  let origX = 0;
  let origY = 0;

  for (let fila = 0; fila < 9; fila++) {
    let numRombos = (fila % 2 === 0) ? 5 : 4;
    let offsetFila = (fila % 2 === 1) ? distanciaX / 2 : 0;
    let y = fila * distanciaY;

    for (let col = 0; col < numRombos; col++) {
      let x = col * distanciaX + offsetFila + 400;
      let d = dist(mouseX, mouseY, x, y);
      if (d < menorDistancia && d < lado) {
        menorDistancia = d;
        filaCercana = fila;
        colCercana = col;
        despX = x - mouseX;
        despY = y - mouseY;
        origX = x;
        origY = y;
      }
    }
  }

  if (filaCercana !== -1) {
    filaSeleccionada = filaCercana;
    columnaSeleccionada = colCercana;
    desplazamientoX = despX;
    desplazamientoY = despY;
    posicionOriginalX = origX;
    posicionOriginalY = origY;
  }
}

function mouseReleased() {
  filaSeleccionada = -1;
  columnaSeleccionada = -1;
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    coloresAleatorios = false;
    semillaColor = 0;
    filaSeleccionada = -1;
    columnaSeleccionada = -1;
  } else if (key === 'c' || key === 'C') {
    coloresAleatorios = true;
    semillaColor++;
  }
}
