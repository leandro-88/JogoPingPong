let somColisao;
let somPonto;
let somFundo;

let chanceDeErrar = 0;  

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function preload() {
  somColisao = loadSound('colisao.mp3'); // Carrega o som da colisão
  somPonto = loadSound('ponto.mp3'); // Carrega o som de ponto
  somFundo = loadSound('fundo.mp3'); // Carrega o som de fundo
}

function setup() {
  createCanvas(600, 400);
  somFundo.loop(); // Toca o som de fundo em loop
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();

}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
    somColisao.play(); // Toca o som da colisão
    
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
    somColisao.play(); // Toca o som da colisão
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  // Limitar a movimentação da raquete para que ela não ultrapasse as bordas
  yRaquete = constrain(yRaquete, 5, 300);
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiu){
    velocidadeXBolinha *= -1;
    somColisao.play(); // Toca o som da colisão
  }
}

function movimentaRaqueteOponente(){
    velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
    calculaChanceDeErrar()
      
  // Limitar a movimentação da raquete para que ela não ultrapasse as bordas
  yRaqueteOponente = constrain(yRaqueteOponente, 5, 300);
}

function incluiPlacar(){
  stroke(255);
  textSize(15);
  textAlign(CENTER);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(color(255,140,0));
  rect(400, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  text(pontosDoOponente, 420, 26);
}

function marcaPonto(){
  if (xBolinha > 591){
    meusPontos += 1;
    somPonto.play(); // Toca o som de ponto
    xBolinha = 300;
    yBolinha = 200
    
  }
  if (xBolinha < 9){
    pontosDoOponente += 1;
    somPonto.play(); // Toca o som de ponto
    xBolinha = 300;
    yBolinha = 200
  }
}

function calculaChanceDeErrar() {
    if (pontosDoOponente >= meusPontos) {
      chanceDeErrar += 1
      if (chanceDeErrar >= 44){
      chanceDeErrar = 40
      }
    } else {
      chanceDeErrar -= 1
      if (chanceDeErrar <= 39){
      chanceDeErrar = 35
      }
    }
  }