let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  background(0);

  for (let i = 0; i < 600; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.changeSpeed();
    p.bounce();
    p.display();
  }
}

class Particle {
  constructor(initX, initY) {
    this.x = initX;
    this.y = initY;
    this.color = color(random(255), random(255), random(255), 500);
    this.xSpeed = random(0.5, 1);
    this.ySpeed = random(0.5, 1);
    this.diaX = 10;
    this.diaY = 10;
    this.maxSpeed = 20;
    this.state = "accelerate";
  }

  changeSpeed() {
    let speed = dist(0, 0, this.xSpeed, this.ySpeed);

    if (this.state === "accelerate") {
      this.xSpeed *= 1.02;
      this.ySpeed *= 1.02;
      if (speed > this.maxSpeed) {
        this.state = "slow";
      }
    } else if (this.state === "slow") {
      this.xSpeed *= 0.85;
      this.ySpeed *= 0.85;
      if (speed < 1.5) {
        this.state = "accelerate";
      }
    }
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    ellipse(0, 0, this.diaX, this.diaY);
    pop();
  }
}
