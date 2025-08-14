let x = [];
let y = [];
let xSpeed = [];
let ySpeed = [];
let dia = [];


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  for (let i = 0; i < 100; i++) {
    x[i] = width / 2;
    y[i] = height / 2;
    xSpeed[i] = random(-3, 3);
    ySpeed[i] = random(-3, 3);
    dia[i] = random(10, 30);
  }
}


function draw() {
  background(220);


  for (let i = 0; i < x.length; i++) {
    // move
    x[i] += xSpeed[i];
    y[i] += ySpeed[i];
    // bounce
    if (x[i] < 0 || x[i] > width) {
      xSpeed[i] *= -1; //xSpeed = xSpeed * -1;
    }
    if (y[i] < 0 || y[i] > height) {
      ySpeed[i] *= -1;
    }
    // display
    circle(x[i], y[i], dia[i]);
    let r = random(255)
    let g = random(255)
    let b = random(255)
    fill(r, g, b)
  }
}
