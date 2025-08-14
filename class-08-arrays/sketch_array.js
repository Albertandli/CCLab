let colors = [
  "Aquamarine",
  "Chartreuse",
  "CornflowerBlue",
  "Cornsilk",
  "DarkOrchid",
  "DarkTurquoise",
  "DeepPink"
]; // array!


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}


function draw() {
  background(220);


  for (let i = 0; i < colors.length; i++) {
    let x = 100;
    let y = 100 + i * 60;
    textSize(40);
    text(colors[i], x, y);
  }
}
