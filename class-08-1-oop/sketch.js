let particles = []; // empty array!


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  background(0);


  for (let i = 0; i < 300; i++) {
    let x = width / 2;
    let y = height / 2;
    particles[i] = new Particle(x, y);
  }


}


function draw() {
  //ackground(0);


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.reappear();
    p.display();
  }
  while (particles.length > 1000) {
    // remove the oldest (first) particle
    particles.splice(0, 1); // (index, quantity)
  }
}


class Particle {
  constructor(initX, initY) {
    this.x = initX;
    this.y = initY;
    this.dia = random(1, 30)
    this.thickness = random(1, 10);

    this.r = random(255);
    this.g = 0
    this.b = 0
  }


  move() {
    this.x = this.x + sin(frameCount * 0.2) * 200
    this.y = this.y + sin(frameCount * 0.3) * 400

  }

  reappear() {
    if (this.x < 0 || this.x > width ||
      this.y < 0 || this.y > height) {
      this.x = width / 2;
      this.y = height / 2;
    }
  }
  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b, 500);
    circle(this.x, this.y, this.dia);
    pop();
  }
}
