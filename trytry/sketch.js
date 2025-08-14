let blogImages = [];
let blogText = [];
let particles = [];



// Load your images
for (let i = 1; i <= 4; i++) {
  blogImages.push(loadImage(`assets/toto${i}.jpg`));
  blogText.push(`Paragraph ${i}: This is placeholder text for blog entry ${i}.`);
}
}

function setup() {
  createCanvas(windowWidth, windowHeight * 2); // Taller for scrolling
  textSize(18);
  noStroke();

  // Create initial sparkle particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height * 2)));
  }
}

function draw() {
  drawGradientBackground();

  // Draw sparkle particles
  for (let p of particles) {
    p.update();
    p.display();
  }

  // Draw blog entries in spiral layout
  let spacing = 300;
  for (let i = 0; i < blogImages.length; i++) {
    let y = 100 + i * spacing;
    if (i % 2 === 0) {
      // image left, text right
      image(blogImages[i], 100, y, 200, 150);
      fill(255);
      text(blogText[i], 350, y, 400, 150);
    } else {
      // text left, image right
      fill(255);
      text(blogText[i], 100, y, 400, 150);
      image(blogImages[i], 550, y, 200, 150);
    }
  }
}

// Pastel pink/purple gradient
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 182, 193), color(221, 160, 221), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// Sparkle particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(2, 5);
    this.speedY = random(0.2, 1);
    this.alpha = random(150, 255);
  }

  update() {
    this.y -= this.speedY;
    if (this.y < 0) {
      this.y = height;
      this.x = random(width);
    }
  }

  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 2);
}
