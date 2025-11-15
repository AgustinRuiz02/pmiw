/*ALEJANDRO TAMAYO - LEGAJO 122913/2 - DOCUMENTO 82224120
AGUSTÍN RUIZ - LEGAJO 122879/8 - DOCUMENTO 43912182
LINK A YOUTUBE TP2 - https://www.youtube.com/watch?v=0UL_ei3N_pE*/


let juego;
let juegoActivo = true;
let cieloImg, sueloImg, piedraImg, troncoImg;
let herculesGif, hidraGif;
let musicaJuego;
let sonidoSalto, sonidoVictoria, sonidoDerrota;

function preload() {
  musicaJuego = loadSound("resources/music-juego.mp3");
  sonidoSalto = loadSound("resources/salto.mp3");
  sonidoVictoria = loadSound("resources/victoria.mp3");
  sonidoDerrota = loadSound("resources/derrota.mp3");
  
  cieloImg = loadImage("img/cielo.jpg");
  sueloImg = loadImage("img/suelo.png");
  piedraImg = loadImage("img/piedra.png");
  troncoImg = loadImage("img/tronco.png");
  herculesGif = loadImage("img/hercules.gif");
  hidraGif = loadImage("img/hidra.gif");
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego();
  
  if (musicaJuego) {
    musicaJuego.setVolume(0.25);
    musicaJuego.loop();
  }
}

function draw() {
  if (juegoActivo && juego) {
    juego.actualizar();
    juego.mostrar();
  }
}

function keyPressed() {
  if (juegoActivo && juego) {
    if (key === ' ') {
      juego.hercules.saltar();
    }
  }
}

function mousePressed() {
  userStartAudio();
  
  if (juegoActivo && juego) {
    if (juego.estado === "jugando") {
      juego.hercules.saltar();
    }
    else if (juego.estado === "gana" || juego.estado === "pierde") {
      juego.reiniciar();
    }
    else if (juego.estado === "instrucciones") {
      juego.estado = "jugando";
    }
  }
}

function colisionRectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
  return r1x < r2x + r2w &&
         r1x + r1w > r2x &&
         r1y < r2y + r2h &&
         r1y + r1h > r2y;
}

class Hercules {
  constructor() {
    this.x = 90;
    this.y = height - 100;
    this.vy = 0;
    this.gravedad = 1;
    this.enSuelo = true;
    this.invulnerable = false;
    this.tiempoInvulnerable = 0;
    this.ancho = 50;
    this.alto = 80;
  }

  actualizar() {
    this.y += this.vy;
    this.vy += this.gravedad;
    if (this.y >= height - 100) {
      this.y = height - 100;
      this.vy = 0;
      this.enSuelo = true;
    }
    
    if (this.invulnerable) {
      this.tiempoInvulnerable--;
      if (this.tiempoInvulnerable <= 0) {
        this.invulnerable = false;
      }
    }
  }

  mostrar() {
    if (this.invulnerable && frameCount % 10 < 5) {
      tint(255, 255, 255, 150);
    } else {
      noTint();
    }
    image(herculesGif, this.x, this.y, this.ancho, this.alto);
    noTint();
  }

  saltar() {
    if (this.enSuelo) {
      this.vy = -18;
      this.enSuelo = false;
      if (sonidoSalto) {
        sonidoSalto.play();
      }
    }
  }

  hacerInvulnerable(tiempo) {
    this.invulnerable = true;
    this.tiempoInvulnerable = tiempo;
  }

  colisionaCon(obstaculo) {
    if (this.invulnerable) return false;
    
    let colision = colisionRectRect(
      this.x, this.y, this.ancho, this.alto,
      obstaculo.x, obstaculo.y, obstaculo.w, obstaculo.h
    );
    return colision;
  }
}

class ObstaculoPiedra {
  constructor() {
    this.x = width;
    this.y = height - 65;
    this.w = 50;
    this.h = 30;
    this.vel = 4;
    this.tipo = "piedra";
  }

  actualizar() {
    this.x -= this.vel;
  }

  mostrar() {
    image(piedraImg, this.x, this.y, this.w, this.h);
  }
}

class ObstaculoArbol {
  constructor() {
    this.x = width;
    this.y = height - 100;
    this.w = 30;
    this.h = 70;
    this.vel = 4;
    this.tipo = "obstaculo_arbol";
  }

  actualizar() {
    this.x -= this.vel;
  }

  mostrar() {
    image(troncoImg, this.x, this.y, this.w, this.h);
  }
}

class PowerUpInvulnerabilidad {
  constructor() {
    this.x = width;
    this.y = height - 80;
    this.w = 35;
    this.h = 35;
    this.vel = 4;
    this.tipo = "powerup_invulnerabilidad";
    this.activo = true;
  }

  actualizar() {
    this.x -= this.vel;
  }

  mostrar() {
    if (this.activo) {
      fill(0, 255, 255);
      rect(this.x, this.y, this.w, this.h);
      fill(255);
      textSize(14);
      text("I", this.x + 12, this.y + 22);
    }
  }

  colisionaCon(hercules) {
    if (!this.activo) return false;
    
    let colision = colisionRectRect(
      hercules.x, hercules.y, hercules.ancho, hercules.alto,
      this.x, this.y, this.w, this.h
    );
    
    if (colision) {
      this.activo = false;
      hercules.hacerInvulnerable(180);
    }
    return colision;
  }
}


class Hidra {
  constructor() {
    this.x = -50;
    this.y = height - 145;
    this.ancho = 160;
    this.alto = 140;
  }

  mostrar() {
    image(hidraGif, this.x, this.y, this.ancho, this.alto);
  }
}

class Juego {
  constructor() {
    this.estado = "instrucciones";
    this.hercules = new Hercules();
    this.obstaculos = [];
    this.hidra = new Hidra();
    this.distancia = 0;
    this.meta = 5000;
    this.scrollSuelo = 0;
    this.scrollCielo = 0;
    this.ultimoObstaculo = 0;
    this.ultimoPowerUp = 0;
    this.minDistanciaEntreObstaculos = 200;
    this.sonidoReproducido = false;
  }

  actualizar() {
    if (this.estado === "jugando") {
      this.hercules.actualizar();
      this.distancia += 4;
      this.scrollSuelo -= 4;
      this.scrollCielo -= 1;
      
      let dificultad = 1 + (this.distancia / 5000);

      // GENERAR OBSTÁCULOS
      if (frameCount - this.ultimoObstaculo > 90 / dificultad) {
        let obstaculoCerca = this.obstaculos.some(obs => 
          obs.x > width - this.minDistanciaEntreObstaculos
        );
        
        if (!obstaculoCerca) {
          let tipoObstaculo = random();
          let nuevoObstaculo;
          
          if (tipoObstaculo < 0.7) {
            nuevoObstaculo = new ObstaculoPiedra();
          } else {
            nuevoObstaculo = new ObstaculoArbol();
          }
          
          this.obstaculos.push(nuevoObstaculo);
          this.ultimoObstaculo = frameCount;
        }
      }

      if (frameCount - this.ultimoPowerUp > 300 && random() < 0.02) {
        let zonaSegura = this.obstaculos.every(obs => 
          obs.x < width - 400 || obs.x > width - 100
        );
        
        if (zonaSegura && this.obstaculos.length > 0) {
          this.obstaculos.push(new PowerUpInvulnerabilidad());
          this.ultimoPowerUp = frameCount;
        }
      }

      for (let i = this.obstaculos.length - 1; i >= 0; i--) {
        let obj = this.obstaculos[i];
        obj.actualizar();
        
        if (obj.tipo === "powerup_invulnerabilidad") {
          obj.colisionaCon(this.hercules);
        } 
        else if (this.hercules.colisionaCon(obj)) {
          if (!this.hercules.invulnerable) {
            this.estado = "pierde";
            if (sonidoDerrota && !this.sonidoReproducido) {
              sonidoDerrota.play();
              sonidoDerrota.setVolume(0.25);
              this.sonidoReproducido = true;
            }
          }
        }
        
        if (obj.x + obj.w < 0) {
          this.obstaculos.splice(i, 1);
        }
      }

      if (this.distancia >= this.meta) {
        this.estado = "gana";
        if (sonidoVictoria && !this.sonidoReproducido) {
          sonidoVictoria.play();
          sonidoVictoria.setVolume(0.25);
          this.sonidoReproducido = true;
        }
      }
    }
  }

  mostrar() {
    for (let x = this.scrollCielo % cieloImg.width; x < width; x += cieloImg.width) {
      image(cieloImg, x, 0, cieloImg.width, height);
    }

    for (let x = this.scrollSuelo % sueloImg.width; x < width; x += sueloImg.width) {
      image(sueloImg, x, height - 40);
    }

    if (this.estado === "instrucciones") {
      fill(255);
      textAlign(CENTER);
      textSize(20);
      text("HÉRCULES vs LA HIDRA\n\nUsa ESPACIO o CLICK para saltar\nRecoge el power-up azul para invulnerabilidad\n\nHaz clic para comenzar", width / 2, height / 2 - 50);
    } else if (this.estado === "jugando") {

      for (let obj of this.obstaculos) {
        obj.mostrar();
      }
      
      this.hercules.mostrar();
      this.hidra.mostrar();

      fill(0, 0, 0, 180);
      rect(10, 10, 220, 50, 5);
      
      fill(255);
      textAlign(LEFT);
      textSize(12);
      text(`DISTANCIA: ${Math.floor(this.distancia)}/${this.meta}`, 20, 25);
      
      if (this.hercules.invulnerable) {
        fill(0, 255, 255);
        text(`INVULNERABLE!`, 20, 40);
      }

      // BARRA DE PROGRESO
      fill(255);
      rect(20, 50, 200, 8);
      fill(0, 255, 0);
      let progreso = map(this.distancia, 0, this.meta, 0, 200);
      rect(20, 50, progreso, 8);
      
    } else if (this.estado === "gana") {
      fill(0, 255, 0);
      textAlign(CENTER);
      textSize(28);
      text("¡VICTORIA DE HÉRCULES!", width / 2, height / 2 - 40);
      textSize(18);
      text(`Distancia: ${this.distancia} metros`, width / 2, height / 2);
      textSize(16);
      text("Haz clic para jugar otra vez", width / 2, height / 2 + 40);
      fill(0, 0, 0);
      text("Juego creado por: \n David Agustin Ruiz y Alejandro Tamayo", width / 2, height / 2 + 70);
      
    } else if (this.estado === "pierde") {
      fill(255, 0, 0);
      textAlign(CENTER);
      textSize(28);
      text("¡LA HIDRA TE ATRAPÓ!", width / 2, height / 2 - 40);
      textSize(18);
      text(`Distancia: ${this.distancia} metros`, width / 2, height / 2);
      textSize(16);
      text("Haz clic para reintentar", width / 2, height / 2 + 40);
      fill(0, 0, 0);
      text("Juego creado por: \n David Agustin Ruiz y Alejandro Tamayo", width / 2, height / 2 + 70);
    }
  }

  reiniciar() {
    this.estado = "instrucciones";
    this.hercules = new Hercules();
    this.obstaculos = [];
    this.hidra = new Hidra();
    this.distancia = 0;
    this.scrollSuelo = 0;
    this.scrollCielo = 0;
    this.ultimoObstaculo = 0;
    this.ultimoPowerUp = 0;
    this.sonidoReproducido = false;
  }
}