let img;

function preload() {
  img = loadImage("assets/eri.jpg");

}

function setup() {
  let canvas = createCanvas(2000, 1000);
  canvas.parent("p5-canvas-container");
  background(0);

}

function draw() {


  let x = mouseX
  let y = mouseY
  let size = 300

  push()
  blendMode(ADD)

  tint(5, 0, 5);
  imageMode(CENTER)
  image(img, x, y, size, size)
  pop();
}
