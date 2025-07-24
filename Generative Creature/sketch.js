let auraColor;
let healingLevel = 0;
let crumbs = [];
let draggedCrumb = null;
let hairColor;
let hoverShine = false;
let showCloseup = false;
let messageTimer = 0;
let showResetButton = false;
let fadeTimers = [];
let maxFadeTime = 15000; // 15 seconds to fade away
let textMemory = [
    "Sunlight. Friend. Guitar. Window. Dust.",
    "Rain. Metal. Bar. Applause. Shiver.",
    "Laughter. Alley. Echo. Steps. Dusk.",
    "Wind. Hill. Jacket. Hug. Beer.",
    "Coffee. Tongue. Bitterness. Silence. Morning."
];

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
    auraColor = color(180, 200, 255, 80);
    hairColor = color(200, 0, 0);

    for (let i = 0; i < 5; i++) {
        crumbs.push({
            x: random(100, width - 100),
            y: random(100, height - 150),
            r: 40,
            txt: textMemory[i],
            dragging: false,
            offsetX: 0,
            offsetY: 0,
            fed: false,
            createdTime: millis()
        });
    }
}

function draw() {
    background(0);

    if (showCloseup) {
        drawCloseupFace();
        if (millis() - messageTimer > 1000) {
            fill(255);
            textSize(16);
            textAlign(CENTER);
            text("*This creature seems upset.", width / 2, height - 100);
        }
        if (millis() - messageTimer > 3000) {
            fill(255);
            textSize(20);
            textAlign(CENTER);
            text("GIVE THEM BACK. THEY ARE MY MEMORIES.", width / 2, height - 70);
        }
        if (millis() - messageTimer > 6000) {
            showResetButton = true;
        }
        if (showResetButton) {
            fill(255, 100, 100);
            rect(width / 2 - 50, height - 40, 100, 30, 5);
            fill(0);
            textSize(16);
            textAlign(CENTER, CENTER);
            text("YES", width / 2, height - 25);
        }
        return;
    }

    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let auraBrightness = map(speed, 0, 50, 200, 50);
    auraBrightness = constrain(auraBrightness, 50, 200);
    auraColor = color(100, 150, 255, auraBrightness);

    stroke(auraColor);
    strokeWeight(3);
    noFill();
    let diaAdj = sin(frameCount * 0.02) * 20;
    ellipse(width / 2, height / 2 + 30, 300 + diaAdj, (300 + diaAdj) * 0.66);

    let r = map(healingLevel, 0, 100, 200, 250);
    let g = map(healingLevel, 0, 100, 0, 220);
    let b = map(healingLevel, 0, 100, 0, 50);
    hairColor = color(r, g, b);

    drawCreature();

    let allFaded = true;

    for (let i = 0; i < crumbs.length; i++) {
        let crumb = crumbs[i];
        if (!crumb.fed) {
            let age = millis() - crumb.createdTime;
            let alpha = map(age, 0, maxFadeTime, 255, 0);
            alpha = constrain(alpha, 0, 255);

            if (alpha > 0) allFaded = false;

            if (crumb.dragging) {
                crumb.x = constrain(mouseX + crumb.offsetX, 0 + crumb.r, width - crumb.r);
                crumb.y = constrain(mouseY + crumb.offsetY, 0 + crumb.r, height - crumb.r);
            }

            fill(255, 220, 100, alpha);
            stroke(255, alpha);
            ellipse(crumb.x, crumb.y, crumb.r * 2);

            fill(150, 0, 0, alpha);
            textAlign(CENTER, CENTER);
            textSize(10);
            text(crumb.txt, crumb.x, crumb.y);
        }
    }

    for (let crumb of crumbs) {
        if (!crumb.fed && crumb.dragging) {
            let d = dist(crumb.x, crumb.y, width / 2, height / 2 + 30);
            if (d < 50) {
                crumb.fed = true;
                healingLevel += 20;
                healingLevel = constrain(healingLevel, 0, 100);
                if (healingLevel >= 100) {
                    messageTimer = millis();
                    showCloseup = true;
                }
            }
        }
    }

    if (allFaded && healingLevel < 100) {
        messageTimer = millis();
        showCloseup = true;
    }

    // Healing Bar
    noStroke();
    fill(150);
    rect(50, 20, 700, 10);
    fill(255, 255, 100);
    rect(50, 20, 7 * healingLevel, 10);
}

function drawCreature() {
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER);

    fill(hairColor);
    rect(0, -90, 40, 20);

    fill(220);
    rect(0, -60, 40, 40);

    let eyewiggleX = map(mouseX, 0, width, -3, 3);
    let eyewiggleY = map(mouseY, 0, height, -2, 2);

    fill(255);
    ellipse(-10 + eyewiggleX, -65 + eyewiggleY, 8);
    ellipse(10 + eyewiggleX, -65 + eyewiggleY, 8);

    fill(220);
    rect(0, 0, 30, 60);

    rect(-25, 0, 10, 40);
    rect(25, 0, 10, 40);

    pop();
}

function drawCloseupFace() {
    push();
    translate(width / 2, height / 2);
    let shakeX = random(-1, 1);
    let shakeY = random(-1, 1);
    translate(shakeX, shakeY);

    fill(220);
    rect(-120, -120, 220, 220, 20);

    fill(255,00, 0.110);
    let eyeOffsetX = constrain(mouseX - width / 2, -10, 10);
    ellipse(-60 + eyeOffsetX * 0.1, -30, 30, 30);
    ellipse(60 + eyeOffsetX * 0.1, -30, 30, 30);
    pop();
}

function mousePressed() {
    if (showResetButton) {
        if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
            mouseY > height - 40 && mouseY < height - 10) {
            resetAll();
        }
        return;
    }

    for (let crumb of crumbs) {
        let d = dist(mouseX, mouseY, crumb.x, crumb.y);
        if (d < crumb.r) {
            crumb.dragging = true;
            crumb.offsetX = crumb.x - mouseX;
            crumb.offsetY = crumb.y - mouseY;
            draggedCrumb = crumb;
            return;
        }
    }
}

function mouseReleased() {
    if (draggedCrumb) {
        draggedCrumb.dragging = false;
        draggedCrumb = null;
    }
}

function resetAll() {
    healingLevel = 0;
    showCloseup = false;
    showResetButton = false;
    crumbs = [];
    for (let i = 0; i < 5; i++) {
        crumbs.push({
            x: random(100, width - 100),
            y: random(100, height - 150),
            r: 40,
            txt: textMemory[i],
            dragging: false,
            offsetX: 0,
            offsetY: 0,
            fed: false,
            createdTime: millis()
        });
    }
}