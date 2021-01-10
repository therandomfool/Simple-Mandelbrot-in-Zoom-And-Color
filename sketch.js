function setup() {
  createCanvas(640, 360);

  noStroke();
  colorMode(HSB);

  drawBrot();
}

let cenX = 0;
let cenY = 0;
let scale = 1;

function draw() {
  if(keyIsDown(LEFT_ARROW)){
    cenX -= 0.5 * 1/scale;
    redraw = true;
  }
  if(keyIsDown(RIGHT_ARROW)){
    cenX += 0.5 * 1/scale;
    redraw = true;
  }
  if(keyIsDown(UP_ARROW)){
    cenY -= 0.5 * 1/scale;
    redraw = true;
  }
  if(keyIsDown(DOWN_ARROW)){
    cenY += 0.5 * 1/scale;
    redraw = true;
  }

  if(keyIsDown(107) || keyIsDown(187)){
    scale += scale*0.5;
    redraw = true;
  }
  if(keyIsDown(109) || keyIsDown(189)){
    scale -= scale*0.5;
    redraw = true;
  }

  if(redraw){
    drawBrot();
  }
}



function drawBrot() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let c = pixelToPoint(x, y)
      let result = calculatePoint(c);

      if (result.isIn) {
        set(x, y, color(0));
      } else if (result.i > 1) {
        set(x, y, color(
          150 + 200 - pow(result.i / (50), 0.5) * 200 % 255, 80, 100));
      } else {
        set(x, y, color(50));
      }
    }
  }
  updatePixels();
}

function pixelToPoint(x, y) {
  let p = createVector(
    (x - width / 2) * (4 / width) * (16 / (9 * scale)) + cenX,
    (y - height / 2) * (4 / height) * (1 / scale) + cenY
  )
  return p;
}

function calculatePoint(c) {
  let z0 = createVector(0, 0);
  let i = 0;
  let bounds = 2;
  let isIn = true;


  while (i < 50 && isIn) {
    z0 = createVector(
      z0.x * z0.x - z0.y * z0.y + c.x,
      2 * z0.x * z0.y + c.y
    );
    i++;
    if (z0.mag() > bounds) {
      isIn = false;
    }
  }
  return {
    'i': i,
    'isIn': isIn
  };
}