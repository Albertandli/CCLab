let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  dancer = new DiscoDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();
  dancer.update();
  dancer.display();
}

class DiscoDancer {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.letters = ["B", "E", "S", "T", "D", "A", "N", "C", "E", "R", "M", "E"];
    this.currentLetterIndex = 0;

    this.pulseColors = [color(255, 100, 100), color(100, 100, 255), color(100, 255, 200)];
  }

  update() {
    this.move();
    this.shake();
  }

  move() {
    this.x = width / 2 + sin(frameCount * 0.05) * 10;

    let remainder = frameCount % 15;
    if (remainder === 0) {
      this.currentLetterIndex = (this.currentLetterIndex + 1) % this.letters.length;
    }
  }

  shake() {
    this.y = height / 2 + random(-2, 2);
  }

  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(100, 100, 255, 150);
    ellipse(0, 20, 90, 130);

    // Body
    fill(50, 180, 255);
    rectMode(CENTER);
    rect(0, 20, 60, 100);
    fill(255, 100, 150, 300);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.letters[this.currentLetterIndex], 0, 20);

    // Head
    fill(255, 150, 200);
    rect(0, -50, 60, 60);

    // Eyes
    this.drawEye(-15, -55);
    this.drawEye(15, -55);

    // Arms with shifting colors
    let col1 = color(255, 255, 100);
    let col2 = color(255, 0, 150);
    let colorShift = (sin(frameCount * 0.1) + 1) / 2;
    let armColor = lerpColor(col1, col2, colorShift);
    this.drawArm(-40, 10, 45, random(160, 200), armColor);
    this.drawArm(40, 10, 45, random(-20, 20), armColor);

    this.drawEnergy();

    pop();
  }

  drawEye(x, y) {
    fill(255);
    ellipse(x, y, 10, 15);
  }

  drawArm(x, y, len, angle, strokeCol) {
    push();
    translate(x, y);
    rotate(radians(angle));
    stroke(strokeCol);
    strokeWeight(6);
    line(0, 0, len, 0);
    pop();
  }

  drawEnergy() {
    push();
    translate(0, -80);
    for (let i = 0; i < 10; i++) {
      let angle = random(TWO_PI);
      let len = random(10, 50);
      let col = random(this.pulseColors);
      stroke(col);
      strokeWeight(2);
      line(0, 0, cos(angle) * len, sin(angle) * len);
    }
    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}
