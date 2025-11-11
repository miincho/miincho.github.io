let canvas;

function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent('canvas-container');
  noFill();
  background(248, 249, 250);
  
  // Draw container outline
  stroke(51);
  strokeWeight(2);
  rect(100, 100, 600, 600, 20);
  
  // Draw center guideline (very light)
  stroke(200);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  line(400, 0, 400, 800);
  drawingContext.setLineDash([]);
  
  // Draw the left side design
  drawLeftSide();
  
  // Draw the right side (mirrored)
  push();
  scale(-1, 1);
  translate(-800, 0);
  drawLeftSide();
  pop();
  
  // Draw central decorative elements
  // drawCenterDecoration();
  
  // Draw top and bottom details
  // drawTopBottomDetails();
}

function drawLeftSide() {
  // Fibonacci spiral path with variable line width
  push();
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.01) {
    // Variable stroke weight
    let weight = map(sin(t * PI), 0, 1, 1, 4);
    strokeWeight(weight);
    stroke(10, 92, 54, map(t, 0, 1, 255, 200));
    
    // Fibonacci spiral coordinates
    let radius = 10 * pow(1.618, 6 * t);
    let angle = 6 * TWO_PI * t;
    let x = 350 + radius * cos(angle);
    let y = 400 + radius * sin(angle);
    
    curveVertex(x, y);
    
    // Add branch points at intervals
    if (t % 0.1 < 0.01 && t > 0.1) {
      drawBranch(x, y, angle + PI/2, radius * 0.5);
    }
  }
  endShape();
  pop();
  
  // Golden ratio spiral with thinner variable width
  push();
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.01) {
    // Different variable stroke pattern
    let weight = map(cos(t * TWO_PI), -1, 1, 0.8, 2.5);
    strokeWeight(weight);
    stroke(85, 139, 47, map(t, 0, 1, 200, 255));
    
    // Golden spiral coordinates
    let k = 0.17; // growth factor
    let radius = 60 * exp(k * t * 10);
    let angle = t * 10;
    let x = 350 + radius * cos(angle);
    let y = 380 + radius * sin(angle);
    
    curveVertex(x, y);
  }
  endShape();
  pop();
  
  // Sine wave vine pattern with variable line width
  push();
  noFill();
  beginShape();
  let startX = 400;
  let startY = 400;
  
  for (let i = 0; i < 240; i += 2) {
    // Variable weight based on sine position
    let weight = map(sin(i/20), -1, 1, 0.5, 3);
    strokeWeight(weight);
    stroke(51, 105, 30, map(i, 0, 240, 255, 150));
    
    let x = startX - i;
    let y = startY + 30 * sin(i/15);
    
    curveVertex(x, y);
    
    // Add small branches occasionally
    if (i % 30 === 0 && i > 0) {
      drawSmallBranch(x, y, i/15 + PI/2);
    }
  }
  endShape();
  pop();
  
  // Logarithmic pattern with variable width
  push();
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.01) {
    // Logarithmic width variation
    let weight = map(log(t * 10 + 1), 0, log(11), 0.5, 2);
    strokeWeight(weight);
    stroke(27, 94, 32, map(t, 0, 1, 170, 255));
    
    let x = 370 - 120 * t + 20 * sin(t * 4 * PI);
    let y = 350 + 80 * t + 20 * cos(t * 5 * PI);
    
    curveVertex(x, y);
  }
  endShape();
  pop();
  
  // Draw leaf vein structures with no fill, just variable width lines
  drawLeafVeins(300, 330, 70, 35);
  drawLeafVeins(360, 270, 60, 35);
}

function drawBranch(x, y, angle, length) {
  push();
  beginShape();
  for (let i = 0; i < length; i += 3) {
    // Variable width for branch
    let weight = map(i, 0, length, 2, 0.3);
    strokeWeight(weight);
    stroke(10, 92, 54, map(i, 0, length, 255, 120));
    
    let branchX = x + i * cos(angle + sin(i/10) * 0.5);
    let branchY = y + i * sin(angle + sin(i/10) * 0.5);
    
    curveVertex(branchX, branchY);
  }
  endShape();
  pop();
}

function drawSmallBranch(x, y, angle) {
  push();
  let branchLength = random(15, 35);
  
  beginShape();
  for (let i = 0; i < branchLength; i += 2) {
    // Variable width for small branch
    let weight = map(i, 0, branchLength, 1.5, 0.2);
    strokeWeight(weight);
    stroke(51, 105, 30, map(i, 0, branchLength, 230, 100));
    
    let branchX = x + i * cos(angle + sin(i/5) * 0.7);
    let branchY = y + i * sin(angle + sin(i/5) * 0.7);
    
    curveVertex(branchX, branchY);
  }
  endShape();
  pop();
}

function drawLeafVeins(x, y, width, height) {
  push();
  // Main vein
  strokeWeight(2);
  stroke(46, 125, 50);
  beginShape();
  let steps = 20;
  
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let xPos = x + width * t;
    let yPos = y + height * sin(t * PI);
    vertex(xPos, yPos);
    
    // Add side veins
    if (i % 4 === 0 && i > 0 && i < steps) {
      drawVeinBranch(xPos, yPos, t * PI, 15 * (1 - t));
    }
  }
  endShape();
  pop();
}

function drawVeinBranch(x, y, angle, length) {
  push();
  stroke(46, 125, 50, 180);
  
  beginShape();
  for (let i = 0; i < length; i++) {
    // Thinning stroke for vein branches
    let weight = map(i, 0, length, 1, 0.2);
    strokeWeight(weight);
    
    let branchX = x + i * cos(angle + HALF_PI);
    let branchY = y + i * sin(angle + HALF_PI);
    
    vertex(branchX, branchY);
  }
  endShape();
  
  beginShape();
  for (let i = 0; i < length; i++) {
    // Thinning stroke for vein branches
    let weight = map(i, 0, length, 1, 0.2);
    strokeWeight(weight);
    
    let branchX = x + i * cos(angle - HALF_PI);
    let branchY = y + i * sin(angle - HALF_PI);
    
    vertex(branchX, branchY);
  }
  endShape();
  pop();
}

function drawCenterDecoration() {
  // Draw central decoration
  push();
  noFill();
  stroke(46, 125, 50);
  
  for (let i = 0; i < 2; i++) {
    let scaleX = i === 0 ? 1 : -1;
    push();
    scale(scaleX, 1);
    translate(i === 0 ? 0 : -800, 0);
    
    beginShape();
    for (let t = 0; t <= 1; t += 0.01) {
      // Variable width
      let weight = map(sin(t * TWO_PI), -1, 1, 0.5, 2);
      strokeWeight(weight);
      
      let x = 400 - 40 * sin(t * TWO_PI) + 20 * cos(t * 4 * TWO_PI);
      let y = 200 + 140 * t + 10 * sin(t * 6 * TWO_PI);
      
      curveVertex(x, y);
    }
    endShape();
    pop();
  }
  pop();
}

function drawTopBottomDetails() {
  // Top detail
  push();
  noFill();
  stroke(85, 139, 47);
  
  beginShape();
  for (let t = 0; t <= 1; t += 0.02) {
    let weight = map(sin(t * PI), 0, 1, 0.5, 2);
    strokeWeight(weight);
    
    let x = 380 + 40 * t;
    let y = 100 + 30 * sin(t * PI);
    
    curveVertex(x, y);
  }
  endShape();
  
  // Bottom detail
  beginShape();
  for (let t = 0; t <= 1; t += 0.02) {
    let weight = map(sin(t * PI), 0, 1, 0.5, 2);
    strokeWeight(weight);
    
    let x = 380 + 40 * t;
    let y = 700 - 30 * sin(t * PI);
    
    curveVertex(x, y);
  }
  endShape();
  pop();
}

function draw() {
  // No animation needed, just static display
}