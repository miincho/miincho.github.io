// one section, small logo for emotions, refine type, make flower size mapping exponential based on fragrance value
// make strength relate to the number of lines in the pattern
// At the top of your code
let allFlowerPositions = [];


let canvas;
let colorMode = 'rich'; 
let sections = 3;
let mirrorVertical = true;
let labelFont;

let teaData = []; 
let currentTeaIndex = 0; 

function preload() {
  labelFont = loadFont('assets/BradfordTrial-Light.otf');
  subFont = loadFont('assets/BradfordTrial-Book.otf');

  icon_appetite = loadImage('assets/icon-appetite2.png');
  icon_concen = loadImage('assets/icon-concen2.png');
  icon_invig = loadImage('assets/icon-invig.png');
  icon_nost = loadImage('assets/icon-nost.png');
  icon_relax = loadImage('assets/icon-relax.png');

  black_logo = loadImage('assets/black-logo.png');
  white_logo = loadImage('assets/white-logo.png');
  dark_logo = loadImage('assets/dark-logo.png');
  med_logo = loadImage('assets/med-logo.png');
  light_logo = loadImage('assets/light-logo.png');
}

function setup() {
  let renderer = createCanvas(550, 800);
  ctx = renderer.drawingContext;
  renderer.parent('canvas-container');
  textFont(labelFont);
  noFill();
  background(0);
  
  let opensheet_uri = `https://opensheet.elk.sh/1igWa8W1c_U2QC1dPe8miAVpAlRGr9R0uB5hnYytha-4/TEA`;
  fetch(opensheet_uri)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Tea Data Loaded:", data);
      teaData = data;
      navBtns();
      
      //draw first tea product
      if (teaData.length > 0) {
        displayTeaProduct(0);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

//spiral frequency dependent on tea strength
function drawMirrored(xBase, yOffset, baseSizeMultiplier, featureType, sectionSize = 100, strength = 5) {
  let mainColor = getColorScheme();
  let flowerPositionsForSection = []; // Store flower positions for this section

  let currentTea = teaData[currentTeaIndex];
  let emotion = currentTea.Emotion;
  console.log(emotion);
  
  // SIMPLIFIED: Number of lines directly correlates to strength
  // Strength 1-2 = 1 line, 3-4 = 2 lines, 5-6 = 3 lines, 7-8 = 4 lines, 9-10 = 5 lines
  let numLines = Math.ceil(strength / 2);
  numLines = Math.min(5, numLines); // Maximum 5 lines per side
  
  // Base spacing value
  let baseSpacing = 15;
  
  // Generate the pattern for each line
  for (let i = 0; i < numLines; i++) {
      // Calculate progressively larger spacing for lines further from center
      // Calculate position for each line
      let linePosition;
      
      if (numLines === 1) {
          // Just one centered line
          linePosition = 0;
      } else if (numLines === 2) {
          // Two lines - position above and below center
          linePosition = (i === 0) ? -baseSpacing : baseSpacing;
      } else {
          // For 3 or more lines, use progressive spacing
          // Calculate distances from center (0, 1, 2, ...) for placement
          let distanceFromCenter;
          
          if (numLines % 2 === 1) { // Odd number of lines
              // For odd numbers, center line is at position 0,
              // others spread out with increasing distances
              distanceFromCenter = i - Math.floor(numLines / 2);
          } else { // Even number of lines
              // For even numbers, no center line
              // First half goes above center, second half below
              distanceFromCenter = (i < numLines / 2) ? 
                  (i - (numLines / 2) + 0.5) : 
                  (i - (numLines / 2) + 0.5);
          }
          
          // Absolute distance from center
          let absDistance = Math.abs(distanceFromCenter);
          
          // Progressive spacing: each line further from center has larger spacing
          // First line: baseSpacing, second: baseSpacing*1.5, third: baseSpacing*2, etc.
          let progressiveSpacing = baseSpacing * (1 + (absDistance * 10));
          
          // Final position with direction
          linePosition = distanceFromCenter * progressiveSpacing;
      }
      
      // Store current random state for each line
      let currentSeed = millis() + i * 1000;
      
      // Set function for different emotions
      let xFunc, yFunc, radiusScale, angleScale, xOffset, yOffset2;
      
      if(emotion == "Relaxation"){
          xFunc = tan; 
          yFunc = sin;
          radiusScale = 13;
          angleScale = 2.5;
          xOffset = 20;
          yOffset2 = 50;
      } else if(emotion === "Nostalgia"){
          xFunc = sin; 
          yFunc = cos;
          radiusScale = 25;
          angleScale = 2.5;
          xOffset = 0;
          yOffset2 = 150;
      } else if(emotion === "Concentration"){
          xFunc = cos; 
          yFunc = cos;
          radiusScale = 50;
          angleScale = 4;
          xOffset = -80;
          yOffset2 = 0;
      } else if(emotion === "Appetize"){
          xFunc = atan; 
          yFunc = tan;
          radiusScale = 8;
          angleScale = 0.8;
          xOffset = 50;
          yOffset2 = 0;
      } else if(emotion === "Invigoration"){
          xFunc = sin; 
          yFunc = atan;
          radiusScale = 15;
          angleScale = 4;
          xOffset = 0;
          yOffset2 = -120;
      }
      
      // Right side spiral - collect flower positions
      let rightFlowers = spiralLine(xFunc, yFunc, radiusScale, angleScale, 
        xBase + 80 + xOffset, yOffset + linePosition + yOffset2, 
        mainColor, baseSizeMultiplier, currentSeed, emotion);
      
      // Add right side flowers to the collection
      flowerPositionsForSection = flowerPositionsForSection.concat(rightFlowers);

      // Left side spiral (mirrored) - need to manually flip the x-coordinates
      push();
      scale(-1, 1); // Flip horizontally
      translate(-xBase*2, 0); // Adjust for the scaling
      
      let leftFlowers = spiralLine(xFunc, yFunc, radiusScale, angleScale, 
        xBase + 80 + xOffset, yOffset + linePosition + yOffset2, 
        mainColor, baseSizeMultiplier, currentSeed, emotion);
      pop();
      
      // Need to flip the x-coordinates back for the left flowers
      leftFlowers = leftFlowers.map(flower => {
          // Calculate the mirrored x position (relative to the center line)
          let mirroredX = width - flower.x;
          return {
              x: mirroredX,
              y: flower.y,
              size: flower.size,
              color: flower.color
          };
      });
      
      // Add left side flowers to the collection
      flowerPositionsForSection = flowerPositionsForSection.concat(leftFlowers);
  }
  
  // Add this section's flowers to the global collection
  allFlowerPositions = allFlowerPositions.concat(flowerPositionsForSection);
}

// Function to draw all collected flowers
function drawAllFlowers() {
  for (let flowerInfo of allFlowerPositions) {
    flower(flowerInfo.x, flowerInfo.y, flowerInfo.size, flowerInfo.color);
  }
  
  // Clear the collection after drawing
  allFlowerPositions = [];
}


//spiral shapes with flowers
// 1. First, modify the spiralLine function to accept emotion as a parameter
function spiralLine(xFunc, yFunc, radiusScale, angleScale, xPos, yPos, lineColor, baseSizeMultiplier, flowerSeed, emotion) {
  push();
  noFill();
  
  let points = []; // Store points for flower placement
  let flowerPositions = []; // New array to store flower positions for later drawing
  
  // Generate points for the spiral
  for (let t = 0; t <= 0.5; t += 0.005) { // Using smaller step for smoother curve
    //fibb spiral coordinates
    let radius = 15 * pow(1.618, radiusScale * t);
    let angle = angleScale * TWO_PI * t;
    
    let x = xPos + radius * xFunc(angle); 
    let y = yPos + radius * yFunc(angle); 
    
    // Store point for line and flower placement
    points.push({x: x, y: y, t: t});
  }
  
  // Use the Catmull-Rom algorithm to get a smooth curve through our points
  let curvePoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    // Get control points (handle catmull-rom algorithm's edge cases)
    let p0 = points[Math.max(0, i-1)];
    let p1 = points[i];
    let p2 = points[i+1];
    let p3 = points[Math.min(points.length-1, i+2)];
    
    // Generate intermediate points for smooth curve
    for (let t = 0; t < 1; t += 0.1) {
      let t2 = t * t;
      let t3 = t2 * t;
      
      // Catmull-Rom interpolation
      let x = 0.5 * ((2 * p1.x) +
                    (-p0.x + p2.x) * t +
                    (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * t2 +
                    (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3);
                    
      let y = 0.5 * ((2 * p1.y) +
                    (-p0.y + p2.y) * t +
                    (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 +
                    (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3);
      
      curvePoints.push({
        x: x, 
        y: y, 
        t: p1.t + (p2.t - p1.t) * t // Interpolate t value
      });
    }
  }
  
  // Draw the line segments with variable stroke weights
  for (let i = 1; i < curvePoints.length; i++) {
    let prev = curvePoints[i-1];
    let curr = curvePoints[i];
    
    // Calculate calligraphic line weight
    // Combine these factors:
    // 1. Position in spiral (thinner at start, thicker in middle, thinner at end)
    let positionFactor = sin(curr.t * PI) * 1.5; //originally 2.5
    
    // 2. Oscillating calligraphic effect
    let oscillation = sin(curr.t * 10) * 2.5 + 3; // higher the range = thicker the lines - range needs to be small though 
    // let oscillation = sin(curr.t * 50) * 0.7 + 1.3; 

    // Calculate final stroke weight 
    let finalWeight = positionFactor * oscillation;
    finalWeight = constrain(finalWeight, 1.5, 5); // Limit range
    
    // Draw the line segment with this weight
    strokeWeight(finalWeight);
    stroke(lineColor);
    line(prev.x, prev.y, curr.x, curr.y);
  }
  
  // Now apply randomness only for flower placement
  randomSeed(flowerSeed);
  
  // Add flowers along the original points array
  // Adjust flower interval based on emotion
  let flowerInterval;
  let flowerDensity;

  if (emotion === "Relaxation" || emotion === "Appetize") {
    // More dense flowers for relaxation, nostalgia, and appetizing (smaller interval)
    flowerDensity = 0.05;
    flowerInterval = Math.max(3, Math.floor(15.5 * pow(1 - flowerDensity, 1.5)));

  } else if (emotion === "Concentration") {
    // Medium density for concentration
    flowerDensity = 0.05;
    flowerInterval = Math.max(3, Math.floor(16* pow(1 - flowerDensity, 1.5)));

  } else if (emotion === "Invigoration") {
    // Less dense flowers for invigoration (larger interval)
    flowerDensity = 0.005;
    flowerInterval = Math.max(3, Math.floor(20 * pow(1 - flowerDensity, 1.5)));

  } else if (emotion === "Nostalgia") {
    // Less dense flowers for invigoration (larger interval)
    flowerDensity = 0.05;
    flowerInterval = Math.max(3, Math.floor(16 * pow(1 - flowerDensity, 1.5)));

  } else {
    // Default interval
    flowerDensity = 0.05;
    flowerInterval = Math.max(3, Math.floor(17 * pow(1 - flowerDensity, 1.5)));
  }
  
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    
    // Place flowers at regular intervals based on the emotion-specific interval
    if (i % flowerInterval === 0) {
      // Base size now depends on position AND the fragrance multiplier
      let positionSize = map(point.t, 0, 0.5, 3, 10);
      let flowerSize = positionSize * baseSizeMultiplier;
      
      // Instead of drawing flowers immediately, store their positions and properties
      flowerPositions.push({
        x: point.x,
        y: point.y,
        size: flowerSize,
        color: lineColor
      });
    }
  }
  
  pop();
  
  // Return the flower positions for later drawing
  return flowerPositions;
}



function navBtns() {
  let prevButton = createButton('Prev');
  prevButton.position(20, 860);
  prevButton.mousePressed(() => {
    currentTeaIndex = (currentTeaIndex - 1 + teaData.length) % teaData.length;
    displayTeaProduct(currentTeaIndex);
  });
  
  let nextButton = createButton('Next');
  nextButton.position(150, 860);
  nextButton.mousePressed(() => {
    currentTeaIndex = (currentTeaIndex + 1) % teaData.length;
    displayTeaProduct(currentTeaIndex);
  });
}


function displayTeaProduct(index) {
  if (teaData.length === 0 || index < 0 || index >= teaData.length) {
    console.log("error");
    return;
  }
  let teaProduct = teaData[index];
  console.log("Displaying tea:", teaProduct);
  
  // color mode based on richness value
  colorMode = teaProduct.Body ? teaProduct.Body.toLowerCase() : 'rich';
  
  //  number of sections based on Strength (using scale 1-10)
  let strength = parseInt(teaProduct.Strength);
  sections = 1;
  // sections = Math.max(1, Math.min(4, Math.ceil(strength / 2))); // 1-2 → 1, 3-4 → 2, 5-6 → 3, 7-8 → 4, 9-10 → 5
  redrawDesign(teaProduct);
}

function redrawDesign(teaProduct) {
  // Reset the flower positions array at the start of each redraw
  allFlowerPositions = [];
  
  //color options for tea richness
  switch(colorMode) {
    case 'rich':
      background('#3A6331'); 
      break;
    case 'medium':
      background('#59934C'); 
      break;
    case 'light':
      background('#8EC183'); 
      break;
    default:
      background('#3A6331');
  }
  
  // Parse fragrance value to determine base size multiplier for flowers
  let fragranceValue = parseInt(teaProduct.Fragrance);
  
  // MODIFIED: Map fragrance to base size multiplier exponentially
  let baseSizeMultiplier = pow(map(fragranceValue, 1, 10, 0.5, 2.2), 1.8);
  console.log("Tea Fragrance:", fragranceValue, "Size Multiplier:", baseSizeMultiplier);
  
  let strength = parseInt(teaProduct.Strength);
  
  // Modified to use horizontal symmetry (left to right)
  mirrorVertical = false; // Turn off vertical mirroring
  
  // Draw in horizontal sections with top-to-bottom symmetry line
  let sectionHeight = height / sections;
  
  // Draw floral design in horizontal sections - JUST THE LINES
  for (let s = 0; s < sections; s++) {
    let yOffset = s * sectionHeight + sectionHeight/2;
    let xBase = width/2; //line of symmetry
    
    // Use a fixed seed per section just for the flower placement
    let sectionSeed = 1000 + s * 1000;
    
    // Alternate between spiral and sine wave for different sections
    if (s % 2 === 0) {
      drawMirrored(xBase, yOffset, baseSizeMultiplier, 'spiral', sectionHeight, strength);
    } 
  }
  
  // NOW DRAW ALL FLOWERS ON TOP
  drawAllFlowers();

  // Create a gradient rectangle at the top
  // The rectangle goes from background color to transparent
  drawGradientRect(0, 0, width, 200, colorMode);

  drawProductInfo(teaProduct);
}


let ctx;
  //tea product and category
// Function to create a gradient rectangle from a color to transparent
function drawGradientRect(x, y, w, h, colorModeStr) {
  // Convert the colorMode string to an actual color
  let startColor;
  switch(colorModeStr) {
    case 'rich':
      startColor = color('#14330D');
      break;
    case 'medium':
      startColor = color('#2D6D1F');
      break;
    case 'light':
      startColor = color('#C8EDC0');
      break;
    default:
      startColor = color('#3A6331');
  }
  
  // Create end color (transparent version of start color)
  let endColor = color(red(startColor), green(startColor), blue(startColor), 0);
  
  // Save the current drawing context
  push();
  
  // Draw a line for each vertical pixel position
  noFill();
  for (let i = 0; i < h; i++) {
    // Calculate normalized position (0 to 1)
    let inter = map(i, 0, h - 1, 0, 1);
    
    // Interpolate between colors
    let c = lerpColor(startColor, endColor, inter);
    stroke(c);
    
    // Draw a horizontal line
    line(x, y + i, x + w, y + i);
  }
  
  // Restore the drawing context
  pop();
}

function drawProductInfo(teaProduct) {

  textSize(80);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();

  textFont(labelFont);

  let emotionCategoryYPos;

  let s = teaProduct.Products;
  let productWordCount = (s) => s.trim().split(/\s+/).length;
  console.log(productWordCount(s));

  if(productWordCount(s) != 1){
    let words = s.trim().split(/\s+/);
  
    // Take the first word
    let firstWord = words[0];
    
    // Join the remaining words
    let remainingWords = words.slice(1).join(' ');
    
    // Draw the first word
    text(firstWord, width/2, 40);
    
    // Draw the remaining words on the next line
    text(remainingWords, width/2, 105); // Adjust the y-position (70) as needed for proper spacing
    emotionCategoryYPos = 160;
  }else{
    text(teaProduct.Products, width/2, 40);
    emotionCategoryYPos = 95;
  }

  textFont(subFont);
  textSize(18);
  text(teaProduct.Category, width/1.25, emotionCategoryYPos);


  textAlign(LEFT);


  let emotionXPos = width/7  ;

  let emotionYPos = emotionCategoryYPos;

  imageMode(CENTER, CENTER); 



  if(teaProduct.Emotion === "Invigoration"){
    text("For Invigoration", emotionXPos +20, emotionYPos);
    image(icon_invig, emotionXPos, emotionCategoryYPos, icon_invig.width * 0.009, icon_invig.height * 0.009);

  }else if(teaProduct.Emotion === "Appetize"){
    text("For Appetizing", emotionXPos +15, emotionYPos);
    image(icon_appetite, emotionXPos, emotionCategoryYPos, icon_invig.width * 0.008, icon_invig.height * 0.008);

  }else if(teaProduct.Emotion === "Relaxation"){
    text("For Relaxation", emotionXPos +20, emotionYPos);
    image(icon_relax, emotionXPos, emotionCategoryYPos+2, icon_invig.width * 0.009, icon_invig.height * 0.009);

  }else if(teaProduct.Emotion === "Concentration"){
    text("For Concentration", emotionXPos +20, emotionYPos);
    image(icon_concen, emotionXPos, emotionCategoryYPos+2, icon_invig.width * 0.008, icon_invig.height * 0.008);

  }else if(teaProduct.Emotion === "Nostalgia"){
    text("For Reminiscing", emotionXPos +20, emotionYPos);
    image(icon_nost,emotionXPos, emotionCategoryYPos+2, icon_invig.width * 0.009, icon_invig.height * 0.009);

  }

  textAlign(CENTER, CENTER);
  textSize(15);
  text("80g", width/15, 770);
  text("2.82 oz.", width/1.1, 770);

  //logo
  imageMode(CENTER, CENTER); 
  image(white_logo, width/2, 770, white_logo.width * 0.2, white_logo.height * 0.2);
}

//STROKE colors for tea richness
function getColorScheme() {
  switch(colorMode) {
    case 'rich':
      return color('#678C5F'); 
    case 'medium':
      return color('#88B47E'); 
      // return color('#678C5F'); 
    case 'light':
      return color('#A7DA9C'); 
      // return color('#678C5F'); 
    default:
      return color('#678C5F'); 
  }
}

// Simplified flower function with consistent size based on fragrance value
function flower(x, y, size, flowerColor) {
  push();
  translate(x, y);
  
  // Use randomness for petal count
  // let numPetals = floor(random(5, 8));
  let numPetals = 5;
  
  // Small random variation (±10%) to add natural variety
  // but maintain the primary size influence from fragrance value
  let sizeMultiplier = random(0.9, 1.1);
  
  // Apply the small random multiplier to the provided size
  // (size already includes the fragrance multiplier)
  let adjustedSize = size * sizeMultiplier;
  
  // Set petal parameters based on adjustedSize
  const petalLength = adjustedSize;
  const petalWidth = adjustedSize * 0.8; // Making width 80% of length
  
  // Determine petal color based on colorMode
  let petalColor;
  switch(colorMode) {
    case 'rich':
      petalColor = color('#88B47E');
      break;
    case 'medium':
      petalColor = color('#A7DA9C');
      break;
    case 'light':
      petalColor = color('#C1F0B9');
      break;
    default:
      petalColor = color('#88B47E');
  }
  
  // Draw petals
  for (let i = 0; i < numPetals; i++) {
    push();
    const angle = TWO_PI * i / numPetals;
    rotate(angle);
    
    // Use the color settings from original function
    fill(petalColor);
    // noFill();
    stroke(flowerColor);
    // strokeWeight(0.5);
    strokeWeight(1.5)
    
    // Draw teardrop shape with point toward center
    beginShape();
    // Start at the center point
    vertex(0, 0);
    
    // Create curved sides of teardrop
    for (let t = 0; t <= 1; t += 0.01) {
      // Parametric equations for teardrop shape
      const x = petalWidth * sin(PI * t) * t;
      const y = -petalLength * t; // Negative to point toward center
      vertex(x, y);
    }
    
    // Complete the other half of the teardrop
    for (let t = 1; t >= 0; t -= 0.01) {
      const x = -petalWidth * sin(PI * t) * t;
      const y = -petalLength * t; // Negative to point toward center
      vertex(x, y);
    }
    
    endShape(CLOSE);
    pop();
  }
  
  // Flower center - deterministic
  fill(255, 255, 150, 200);
  noStroke();
  ellipse(0, 0, adjustedSize/4, adjustedSize/4);
  
  pop();
}function draw() {}