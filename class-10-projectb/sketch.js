let fontRegular;
let currentSpeech = null;
let speech1, speech2, speech3;
let bgMusic, errorSound, blackDotSound, muffledSound, bangSound;
let bgVideo;
let laughPlayCount = 0;
let ohmyPlayed = false;         // tracks if ohmyVideo has already played
let laughVideosStarted = false; // tracks if laugh1/laugh2 started
let laughStageStarted = false;
let laughStageStartTime = 0;
let finalLaughCount = 0;
let postLaughStage = false;
let postLaughStageStartTime = 0;
let showResetButton = false;

let textParticles = [];
let ohmyDone = false;
let stage = 0;
let stageStartTime;
let laughClips = [];
let laugh1Video, laugh2Video;
let scaryWhisper, finalLaugh;
let overlayText = [
  "Day 999: The moon is there, but I barely look. I go out at night now, because she can not. The stars do not talk anymore, or maybe I stopped being someone worth talking to. Mom said I should meet someone, to get something. She promised it would be the last time, that she would be clean. I said I would go. I tried a little, to do it with her, just to keep her close, to stop her from hurting herself. We are done with this. We are done with this. Hi, stars, maybe the future, the moon, maybe, YOU. You have been here, since I was small, right? I looked to you then, because Mom was not. Now I look to you, because she is. And I want to keep her, I want us both to stay, to hold on, to not vanish. Please. Or just take us somewhere soft, somewhere quiet, somewhere with her, somewhere with stars.",
  "Day 99: Tonight the moon found me. White and sharp, like it cut a hole through the dark just for my face. The stars crowded around it, watching, waiting. For a second, I swear I stepped out of myself. Like I was already there, with you, in the future. I did not want to blink in case it stopped. If you would have been here, maybe you would have taken me with you.",
  "Day 1:  Mama left again, she always says she will be right back, but I never know. The camera is staring at me, and I stare back like maybe it knows where people go when they leave. They say the moon follows you. I have never seen it, but I want to. I think if I could, maybe it could take me somewhere after. Maybe to your time.."
];
let showOverlay = false;

let ohmyVideo;
let totoImages = [];

let sparkleParticles = [];

let floatingImages = [];
let dialogueTexts = [
  "Day 999. END.",
  "Day 99. I love the moon.",
  "Day 1. My profile picture..",
];
let replacementTexts = [
  "JUST GO.",
  "STAY.",
  "TAKE HER.",
];
let numImages = 3;

let blackDotVisible = false;
let blackDotClicked = false;
let blackDotClickCount = 0;

let blackDotX, blackDotY;
let blackDotSize = 20;

let chaosStartTime = 0;
const chaosDuration = 5000; // 5 seconds duration

let welcomeShown = true;
let welcomeAlpha = 255;
let welcomeStartTime;

let waitMessageVisible = false;

let bgMusicDistortionAmount = 0;
let postChaosPhase = false;
let postChaosStartTime = 0;
let postChaosStep = 0;

let selectedImageIndex = -1;

//End Of Initializing
class SparkleParticle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.alpha = random(200, 255);
    this.alphaDir = random() > 0.5 ? 1 : -1;
    this.speedX = random(-0.3, 0.3);
    this.speedY = random(-0.3, 0.3);
  }
  update() {
    this.alpha += this.alphaDir * 3;
    if (this.alpha > 255) {
      this.alpha = 255;
      this.alphaDir = -1;
    } else if (this.alpha < 50) {
      this.alpha = 50;
      this.alphaDir = 1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    else if (this.y > height) this.y = 0;
  }

  display() {
    noStroke();
    fill(255, 255, 255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}
//上面是控制背景亮晶晶的一闪一闪

class GlitchParticle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 100);
    this.color = [random(255), random(255), random(255), random(100, 200)];
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    else if (this.y > height) this.y = 0;
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size, this.size / 2);
  }
}

let glitchParticles = [];

function preload() {
  fontRegular = loadFont('assets/pixel.ttf');
  bgMusic = loadSound('assets/Background.mp3');
  blackDotSound = loadSound('assets/blackdot.mp3');
  errorSound = loadSound('assets/warb.mp3');
  scaryWhisper = loadSound('assets/scarywhisper.mp3');
  finalLaugh = loadSound('assets/finallaugh.mp3');
  muffledSound = loadSound('assets/muffledSound.mp3');
  bangSound = loadSound('assets/bangSound.mp3');
  speech1 = loadSound('assets/speech1.mp3');
  speech2 = loadSound('assets/speech2.mp3');
  speech3 = loadSound('assets/speech3.mp3');


  for (let i = 1; i <= numImages; i++) {
    totoImages.push(loadImage(`assets/toto${i}.jpg`));
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(fontRegular);
  textSize(28);
  noStroke();
  stageStartTime = millis();

  // Setup video
  ohmyVideo = createVideo('assets/ohmy.mp4');
  ohmyVideo.hide();
  ohmyVideo.elt.loop = false;
  bgVideo = createVideo('assets/sayshelp.mp4');
  bgVideo.hide();
  laugh1Video = createVideo('assets/laugh1.mp4');
  laugh2Video = createVideo('assets/laugh2.mp4');
  laugh1Video.hide();
  laugh2Video.hide();

  // Initialize sparkle particles
  for (let i = 0; i < 1000; i++) {
    sparkleParticles.push(new SparkleParticle());
  }

  // Initialize floating images
  for (let i = 0; i < numImages; i++) {
    floatingImages.push({
      img: totoImages[i],
      x: 0,
      y: 0,
      vx: random([-2, 2]),
      vy: random([-2, 2]),
      alpha: 0,
      text: dialogueTexts[i]
    });
  }

  resetPositions();

  // Black dot initial position
  blackDotX = width - blackDotSize - 40;
  blackDotY = 60;

  welcomeStartTime = millis();

  // Start bg music on first user interaction
  userStartAudio().then(() => {
    bgMusic.loop();
    bgMusic.setVolume(0.4);
  });
}

function resetPositions() {
  let centerX = width / 2;
  let centerY = height / 2;
  let spacing = 170;
  for (let i = 0; i < floatingImages.length; i++) {
    floatingImages[i].x = centerX + (i - (numImages - 1) / 2) * spacing;
    floatingImages[i].y = centerY;
    floatingImages[i].vx = random([-2, 2]);
    floatingImages[i].vy = random([-2, 2]);
    floatingImages[i].alpha = 0;
  }
}

function backgroundGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(65, 91, 54), color(180, 100, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function draw() {
  backgroundGradient();

  if ((millis() - welcomeStartTime > 15000) || (blackDotClicked && millis() - chaosStartTime > chaosDuration)) {
    blackDotVisible = true;
  }

  // Show fullscreen video only on 3rd click effect active, else hide
  if (blackDotClicked && blackDotClickCount === 3) {
    //bgVideo.show();
    image(bgVideo, 0, 0, width, height);
  } else {
    bgVideo.hide();
  }

  // Sparkle particles only if black dot not clicked or on 1st click wait message
  if (!blackDotClicked || (blackDotClickCount === 1 && waitMessageVisible)) {
    for (let sp of sparkleParticles) {
      sp.update();
      sp.display();
    }
  }

  if (!blackDotClicked && stage < 2) {
    drawFloatingImages();
  }
  let elapsedStage = millis() - stageStartTime;

  if (stage === 1) {
    background(0);
    textAlign(CENTER, CENTER);
    if (elapsedStage < 5000) {
      // First 5 seconds white text
      fill(255);
      textSize(32);
      text("Hi, I am Toto. The other me-you will see him later. He got lost in all the lonely years.", width / 2, height / 2);
    } else if (elapsedStage < 10000) {
      // Next 10 seconds red text
      fill(255, 245, 200, 230);
      textSize(40);
      text("He's a mess, let him rot. But please, do not let anything happen to my mom.", width / 2, height / 2);
    } else {
      stage = 2;
      stageStartTime = millis();
    }
  } else if (stage === 2) {
    if (bgMusic.isPlaying()) {
      bgMusic.stop();
    }
    imageMode(CORNER);
    image(totoImages[2], 0, 0, width, height);
    if (elapsedStage > 5000) {
      stage = 3;
      stageStartTime = millis();
      ohmyVideo.stop();       // Stop and reset the video
      ohmyVideo.time(0);      // Set playback position to start (0 seconds)
      ohmyVideo.volume(1.0);
      ohmyVideo.play();
      //ohmyVideo.loop();
      //ohmyVideo.volume(1.0);
    }
  } else if (stage === 3) {
    // ---------- Stage 3: ohmy video + whisper ----------
    if (!ohmyPlayed) {
      ohmyVideo.time(0);
      ohmyVideo.play();
      scaryWhisper.play();
      ohmyPlayed = true;
      floatingImages = [];

      setTimeout(() => {
        if (scaryWhisper.isPlaying()) scaryWhisper.stop();
      }, 15000);
    }

    // Check if ohmy video finished
    if (ohmyPlayed && !ohmyDone && ohmyVideo.time() >= ohmyVideo.duration()) {
      ohmyVideo.stop();
      ohmyDone = true;

      // Start laugh videos
      laugh1Video.time(0);
      laugh2Video.time(0);
      laugh1Video.play();
      laugh2Video.play();
      laughVideosStarted = true;

      // Spawn chaotic text
      for (let i = 0; i < 20; i++) {
        textParticles.push({
          txt: random(["All alone!", "I'm fine!"]),
          x: random(width),
          y: random(height),
          size: random(24, 64),
          alpha: random(50, 200)
        });
      }

    }

    // ---------- Draw ohmy or laugh videos ----------
    if (!laughVideosStarted) {
      image(ohmyVideo, 0, 0, width, height);
    } else {
      background(0);

      // Layout laugh videos
      image(laugh1Video, 0, height / 2 - 200, width / 2, 400);
      image(laugh2Video, width / 2, height / 2 - 200, width / 2, 400);
      image(laugh1Video, width / 4 - 100, height / 4 - 100, 200, 200);
      image(laugh2Video, 3 * width / 4 - 100, height / 4 - 100, 200, 200);
      image(laugh1Video, width / 4 - 100, 3 * height / 4 - 100, 200, 200);
      image(laugh2Video, 3 * width / 4 - 100, 3 * height / 4 - 100, 200, 200);

      // ---------- Step 3: Laugh stage ----------
      if (!laughStageStarted) {
        laughStageStarted = true;
        laughStageStartTime = millis();
        if (!finalLaugh.isPlaying()) {
          finalLaugh.play();
        }
      }

      if (laughStageStarted) {
        let elapsedLaugh = millis() - laughStageStartTime;

        // Draw laugh videos before drawing text
        image(laugh1Video, 0, height / 2 - 200, width / 2, 400);
        image(laugh2Video, width / 2, height / 2 - 200, width / 2, 400);
        // Up
        image(laugh1Video, width / 4 - 100, height / 4 - 100, 200, 200);
        image(laugh2Video, 3 * width / 4 - 100, height / 4 - 100, 200, 200);
        // Down
        image(laugh1Video, width / 4 - 100, 3 * height / 4 - 100, 200, 200);
        image(laugh2Video, 3 * width / 4 - 100, 3 * height / 4 - 100, 200, 200);

        // chaotic text on top
        let count = frameCount % 200;
        for (let i = 0; i < count; i++) {
          fill(255, 0, 0, random(50, 200));
          textSize(random(20, 60));
          textAlign(CENTER, CENTER);
          text(random(["All alone!", "I'm fine!"]), random(width), random(height));
        }

        // End laugh stage after 10s
        if (millis() - laughStageStartTime > 10000) {
          laughStageStarted = false;
          postLaughStage = true;
          postLaughStageStartTime = millis();

          // Stop laugh videos and finalLaugh here
          laugh1Video.stop();
          laugh2Video.stop();
          finalLaugh.stop();
        }
      }

      // ---------- Step 4: Post-laugh text ----------
      if (postLaughStage) {
        let elapsedPostLaugh = millis() - postLaughStageStartTime;
        background(0);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(48);

        if (elapsedPostLaugh < 10000) {
          text("You don't get to interfere with their life.", width / 2, height / 2);
        } else if (elapsedPostLaugh < 25000) {
          text("Because this is just a class project.", width / 2, height / 2);
        } else if (elapsedPostLaugh < 40000) {
          text("Spend more time with them?", width / 2, height / 2);

          // Show YES button
          showYesButton = true;
          yesButtonX = width / 2 - yesButtonW / 2;
          yesButtonY = height / 2 + 100;
          fill(0, 200, 0);
          rect(yesButtonX, yesButtonY, yesButtonW, yesButtonH, 20);
          fill(255);
          textSize(36);
          text("YES", width / 2, yesButtonY + yesButtonH / 2);
        } else {
          postLaughStage = false;
          resetMain();
          stage = 0;
          stageStartTime = millis();
        }
      }
    } // end else for laughVideosStarted
  }

  // Show welcome message
  if (welcomeShown) {
    let elapsed = (millis() - welcomeStartTime) / 1000;
    if (elapsed < 15) {
      if (elapsed > 12) {
        welcomeAlpha = map(elapsed, 12, 15, 255, 0);
      }
      fill(123, 104, 238, welcomeAlpha);
      textAlign(CENTER, TOP);
      textSize(40);
      text("TOTO'S BLOG.", width / 2, height / 8);
    } else {
      welcomeShown = false;
    }
  }

  // Show black dot only if visible and not in postChaosPhase
  if (blackDotVisible && !postChaosPhase) {
    drawBlackDot();
  }

  // Handle effects by click count
  if (blackDotClicked) {
    let elapsed = millis() - chaosStartTime;
    switch (blackDotClickCount) {
      case 1:
        runWaitEffect(elapsed);
        break;
      case 2:
        runParticlesEffect(elapsed);
        break;
      case 3:
        runVideoDistortEffect(elapsed);
        break;
      default:
        resetMain();
        break;
    }
  } else if (postChaosPhase) {
    runPostChaosSequence();
  } else {
    // Normal state: sparkle particles and floating images
    for (let sp of sparkleParticles) {
      sp.update();
      sp.display();
    }

    drawFloatingImages();
  }

  // Floating images hover text if not clicked
  if (selectedImageIndex >= 0) {
    background(0, 180);
    push();
    imageMode(CENTER);
    image(totoImages[selectedImageIndex], width / 2, height / 3, 500, 500);
    pop();
    // Draw text below the image
    fill(255, 245, 200, 230);
    textAlign(CENTER, TOP);
    textSize(24);
    textLeading(34);
    let txt = overlayText[selectedImageIndex];
    text(txt, width / 8, height / 3 + 260, width * 0.8);
  }

  // Slight volume distortion effect if bgMusic is playing and blackDotClicked is false
  if (!bgMusic.isPlaying()) return;
  if (blackDotClickCount > 0 && !blackDotClicked) {
    bgMusicDistortionAmount += 0.05;
    let vol = 0.4 + 0.05 * sin(bgMusicDistortionAmount);
    bgMusic.setVolume(constrain(vol, 0.3, 0.5));
  }
}

function drawFloatingImages() {
  for (let fimg of floatingImages) {
    fimg.x += fimg.vx;
    fimg.y += fimg.vy;

    if (fimg.x < 75) {
      fimg.x = 75;
      fimg.vx *= -1;
    } else if (fimg.x > width - 75) {
      fimg.x = width - 75;
      fimg.vx *= -1;
    }

    if (fimg.y < 75) {
      fimg.y = 75;
      fimg.vy *= -1;
    } else if (fimg.y > height - 75) {
      fimg.y = height - 75;
      fimg.vy *= -1;
    }
    push();
    imageMode(CENTER);
    image(fimg.img, fimg.x - 75, fimg.y - 75, 350, 350);
    pop();
  }
}




function drawBlackDot() {
  fill(0);
  rect(blackDotX, blackDotY, blackDotSize, blackDotSize);
}

// ------------- EFFECTS -------------

function runWaitEffect(elapsed) {
  if (!waitMessageVisible) {
    waitMessageVisible = true;
    bgMusic.pause();
  }
  background(0, 0, 0, 180);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("Hello?", width / 2, height / 2);

  if (elapsed > chaosDuration) {
    waitMessageVisible = false;
    blackDotClicked = false;
    blackDotVisible = true;
    resetPositions();
    bgMusic.loop();
    bgMusic.setVolume(0.4);
  }
}

function runParticlesEffect(elapsed) {
  if (elapsed === 0) {
    if (!blackDotSound.isPlaying()) blackDotSound.loop();
    bgMusic.pause();
    glitchParticles = [];
  }

  if (glitchParticles.length < 5000) {
    for (let i = 0; i < 1000; i++) {
      glitchParticles.push(new GlitchParticle());
    }
  }

  for (let p of glitchParticles) {
    p.update();
    p.display();
  }

  if (elapsed > chaosDuration) {
    blackDotSound.stop();
    blackDotClicked = false;
    blackDotVisible = true;
    glitchParticles = [];
    resetPositions();
    bgMusic.loop();
    bgMusic.setVolume(0.4);
  }
}

function runVideoDistortEffect(elapsed) {
  if (elapsed === 0) {
    if (!errorSound.isPlaying()) errorSound.play();
    if (!muffledSound.isPlaying()) muffledSound.loop();
    if (!bangSound.isPlaying()) {
      bangSound.setVolume(1.0);
      bangSound.loop();
    }
    bgMusic.pause();
  }

  // Show fullscreen video (handled in draw)
  // Red glitch overlay
  for (let i = 0; i < 100; i++) {
    fill(255, 0, 0, random(50, 120));
    noStroke();
    rect(random(width), random(height), random(20, 60), random(10, 30));
  }

  if (elapsed > chaosDuration) {
    errorSound.stop();
    muffledSound.stop();
    bangSound.stop();
    blackDotClicked = false;
    blackDotVisible = true;
    resetPositions();
    bgMusic.loop();
    bgMusic.setVolume(0.4);
    bgVideo.hide();
  }// Start post chaos timer and phase
  postChaosPhase = true;
  postChaosStartTime = millis();
  postChaosStep = 0;

  bgMusic.loop();
  bgMusic.setVolume(0.4);
  bgVideo.hide();
}


function runPostChaosSequence() {
  background(0, 180); // translucent black overlay
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(48);

  let elapsedPost = millis() - postChaosStartTime;

  if (elapsedPost < 5000) {
    // Wait silently, just overlay black
  } else if (elapsedPost < 10000) {
    // Show 
    text("That was my son.", width / 2, height / 2);
  } else if (elapsedPost < 20000) {
    // Show
    text("Would you hold him close for me?", width / 2, height / 2);
  } else {
    // Reset everything after
    postChaosPhase = false;
    blackDotVisible = false;
    resetPositions();
    // Start Stage 1 of Toto sequence
    stage = 1;
    stageStartTime = millis();
  }
}


// ------------- INPUT -------------

function mousePressed() {
  if (
    blackDotVisible &&
    mouseX > blackDotX &&
    mouseX < blackDotX + blackDotSize &&
    mouseY > blackDotY &&
    mouseY < blackDotY + blackDotSize &&
    !blackDotClicked
  ) {
    blackDotClicked = true;
    blackDotClickCount++;
    chaosStartTime = millis();

    blackDotSize = 20 + (blackDotClickCount - 1) * 16;
    if (blackDotSize > 100) blackDotSize = 100;

    // Replace floating image with replacement text cycling
    let replaceIndex = (blackDotClickCount - 1) % numImages;
    let pg = createGraphics(150, 150);
    pg.textFont(fontRegular);
    pg.background(random(0, 100), 0, 0);
    pg.fill(255);
    pg.textAlign(CENTER, CENTER);
    pg.textSize(32);
    pg.text(replacementTexts[replaceIndex], 75, 75);
    floatingImages[replaceIndex].img = pg;
    floatingImages[replaceIndex].text = replacementTexts[replaceIndex];

    // Stop background music on any click
    if (bgMusic.isPlaying()) bgMusic.stop();


    if (blackDotClickCount === 2) {
      if (!blackDotSound.isPlaying()) blackDotSound.loop();
    } else {
      if (blackDotSound.isPlaying()) blackDotSound.stop();
    }
    if (blackDotClickCount === 3) {
      bgVideo.stop();
      bgVideo.time(0);         // rewind to start
      bgVideo.play();
      if (!errorSound.isPlaying()) errorSound.play();
      if (!muffledSound.isPlaying()) muffledSound.loop();
      if (!bangSound.isPlaying()) {
        bangSound.setVolume(1.0);
        bangSound.loop();
      }
    } else {
      if (errorSound.isPlaying()) errorSound.stop();
      if (muffledSound.isPlaying()) muffledSound.stop();
      if (bangSound.isPlaying()) bangSound.stop();
    }
  }

  //
  if (!blackDotClicked) {
    let selected = false;
    for (let i = 0; i < floatingImages.length; i++) {
      let f = floatingImages[i];
      let d = dist(mouseX, mouseY, f.x, f.y);
      if (d < 175) {
        fill(238, 207, 50, 255);
        textAlign(CENTER, TOP);
        textSize(28);
        text(f.text, f.x, f.y + 90);
        if (mouseIsPressed) {
          selectedImageIndex = i;
          selected = true;

          // Stop bgMusic
          if (bgMusic.isPlaying()) bgMusic.stop();

          // Stop previous speech if any
          if (currentSpeech && currentSpeech.isPlaying()) currentSpeech.stop();

          // Play speech based on which image is clicked
          if (i === 0) currentSpeech = speech3;
          else if (i === 1) currentSpeech = speech2;
          else if (i === 2) currentSpeech = speech1;

          if (currentSpeech) currentSpeech.play();
        }
      }
    }

    if (!selected) {
      // No image clicked: deselect overlay
      selectedImageIndex = -1;

      // Stop any speech if still playing
      if (currentSpeech && currentSpeech.isPlaying()) currentSpeech.stop();

      // Resume bgMusic
      if (!bgMusic.isPlaying()) {
        bgMusic.loop();
        bgMusic.setVolume(0.4);
      }
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetPositions();

  // reposition black dot bottom right
  blackDotX = width - blackDotSize - 40;
  blackDotY = 60;

  welcomeStartTime = millis();
}

function resetMain() {
  blackDotClicked = false;
  blackDotVisible = true;
  resetPositions();
  bgMusic.loop();
  bgMusic.setVolume(0.4);
  showToto = false;
  totoAlpha = 0;
  dialogueAlpha = 0;
  waitMessageVisible = false;
  bgMusicDistortionAmount = 0;
  glitchParticles = [];
}


console.log(totoImages.length);
console.log(totoImages[2]);


