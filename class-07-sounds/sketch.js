let mic;


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  background(220);


  mic = new p5.AudioIn();
  mic.start(); // ***
}


function draw() {
  background(220, 30);


  let volume = mic.getLevel();
  let dia = map(volume, 0, 0.15, 1, 500);


  noStroke();
  fill(0, 255, 255);
  circle(width / 2, height / 2, dia);


  fill(0);
