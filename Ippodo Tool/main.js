// === GLOBAL VARIABLES ===
let allFlowerPositions = [];
let canvas;
// let colorMode = 'rich'; 
let sections = 3;
let mirrorVertical = true;
let labelFont, subFont;
let teaData = [];
let currentTeaIndex = 0;

// === PRELOAD ASSETS ===
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

// === SETUP ===
function setup() {
  let renderer = createCanvas(550, 800);
  renderer.parent('canvas-container');
  textFont(labelFont);
  noFill();
  background(255);

  // When “Generate” is clicked
  document.getElementById('generate').addEventListener('click', () => {
    let teaProduct = getUIInputs();
    console.log("Generating label for:", teaProduct);
    redrawDesign(teaProduct);
  });

  // Make category and emotion buttons selectable
  setupButtonGroups();
}

function setupButtonGroups() {
  const categoryButtons = document.querySelectorAll('#categoryGroup .button');
  const emotionButtons = document.querySelectorAll('#emotionGroup .button');
  const bodyButtons = document.querySelectorAll('#bodyGroup .button');

  function handleSelection(buttons, selectedButton) {
    buttons.forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => handleSelection(categoryButtons, btn));
  });

  emotionButtons.forEach(btn => {
    btn.addEventListener('click', () => handleSelection(emotionButtons, btn));
  });

    bodyButtons.forEach(btn => {
    btn.addEventListener('click', () => handleSelection(bodyButtons, btn));
  });
}

// === SETUP UI ===
function setupUI() {
  // Listen for a "Generate" button click
  const generateBtn = document.getElementById('generate-btn');
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      let teaProduct = getUIInputs();
      displayTeaProductFromUI(teaProduct);
    });
  }
}

// === COLLECT INPUTS FROM HTML FORM ===
function getUIInputs() {
  let product = document.getElementById('input-product')?.value || "Unnamed Tea";

  // Category selection
  let selectedCategoryButton = document.querySelector('#categoryGroup .button.selected');
  let category = selectedCategoryButton ? selectedCategoryButton.textContent : "Sencha";

  // Emotion selection
  let selectedEmotionButton = document.querySelector('#emotionGroup .button.selected');
  let emotion = selectedEmotionButton ? selectedEmotionButton.textContent : "Relax";

  // Body selection (NEW)
  let selectedBodyButton = document.querySelector('#bodyGroup .button.selected');
  let body = selectedBodyButton ? selectedBodyButton.textContent : "Rich";

  // Sliders
  let strength = parseInt(document.getElementById('strengthRange')?.value || 5);
  let fragrance = parseInt(document.getElementById('fragranceRange')?.value || 5);

  const emotionMap = {
    "Relax": "Relaxation",
    "Invigorate": "Invigoration",
    "Concentrate": "Concentration",
    "Appetize": "Appetize",
    "Nostalgia": "Nostalgia"
  };
  emotion = emotionMap[emotion] || emotion;

  return {
    Products: product,
    Category: category,
    Emotion: emotion,
    Strength: strength,
    Fragrance: fragrance,
    Body: body
  };
}


// === DISPLAY TEA PRODUCT FROM UI ===
function displayTeaProductFromUI(teaProduct) {
  console.log("Displaying tea from UI:", teaProduct);
  colorMode = teaProduct.Body.toLowerCase(); // uses 'rich', 'medium', 'light'
  let strength = parseInt(teaProduct.Strength);
  sections = 1;
  redrawDesign(teaProduct);
}


// === EVERYTHING BELOW IS THE SAME ===

//spiral frequency dependent on tea strength
function drawMirrored(xBase, yOffset, baseSizeMultiplier, featureType, sectionSize = 100, strength = 5) {
  let mainColor = getColorScheme();
  let flowerPositionsForSection = [];
  let emotion = getUIInputs().Emotion;

  let numLines = Math.ceil(strength / 2);
  numLines = Math.min(5, numLines);
  let baseSpacing = 15;

  for (let i = 0; i < numLines; i++) {
    let linePosition;
    if (numLines === 1) {
      linePosition = 0;
    } else if (numLines === 2) {
      linePosition = (i === 0) ? -baseSpacing : baseSpacing;
    } else {
      let distanceFromCenter;
      if (numLines % 2 === 1) {
        distanceFromCenter = i - Math.floor(numLines / 2);
      } else {
        distanceFromCenter = (i < numLines / 2) ? 
          (i - (numLines / 2) + 0.5) : 
          (i - (numLines / 2) + 0.5);
      }
      let absDistance = Math.abs(distanceFromCenter);
      let progressiveSpacing = baseSpacing * (1 + (absDistance * 10));
      linePosition = distanceFromCenter * progressiveSpacing;
    }

    let currentSeed = millis() + i * 1000;
    let xFunc, yFunc, radiusScale, angleScale, xOffset, yOffset2;
      
    if(emotion == "Relaxation"){
      xFunc = tan; yFunc = sin; radiusScale = 13; angleScale = 2.5; xOffset = 20; yOffset2 = 50;
    } else if(emotion === "Nostalgia"){
      xFunc = sin; yFunc = cos; radiusScale = 25; angleScale = 2.5; xOffset = 0; yOffset2 = 150;
    } else if(emotion === "Concentration"){
      xFunc = cos; yFunc = cos; radiusScale = 50; angleScale = 4; xOffset = -80; yOffset2 = 0;
    } else if(emotion === "Appetize"){
      xFunc = atan; yFunc = tan; radiusScale = 8; angleScale = 0.8; xOffset = 50; yOffset2 = 0;
    } else if(emotion === "Invigoration"){
      xFunc = sin; yFunc = atan; radiusScale = 15; angleScale = 4; xOffset = 0; yOffset2 = -120;
    }

    let rightFlowers = spiralLine(xFunc, yFunc, radiusScale, angleScale, 
      xBase + 80 + xOffset, yOffset + linePosition + yOffset2, 
      mainColor, baseSizeMultiplier, currentSeed, emotion);

    flowerPositionsForSection = flowerPositionsForSection.concat(rightFlowers);

    push();
    scale(-1, 1);
    translate(-xBase*2, 0);
    let leftFlowers = spiralLine(xFunc, yFunc, radiusScale, angleScale, 
      xBase + 80 + xOffset, yOffset + linePosition + yOffset2, 
      mainColor, baseSizeMultiplier, currentSeed, emotion);
    pop();

    leftFlowers = leftFlowers.map(flower => {
      let mirroredX = width - flower.x;
      return { x: mirroredX, y: flower.y, size: flower.size, color: flower.color };
    });

    flowerPositionsForSection = flowerPositionsForSection.concat(leftFlowers);
  }

  allFlowerPositions = allFlowerPositions.concat(flowerPositionsForSection);
}

function drawAllFlowers() {
  for (let flowerInfo of allFlowerPositions) {
    flower(flowerInfo.x, flowerInfo.y, flowerInfo.size, flowerInfo.color);
  }
  allFlowerPositions = [];
}

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


function redrawDesign(teaProduct) {
  allFlowerPositions = [];
  switch(colorMode) {
    case 'rich': background('#3A6331'); break;
    case 'medium': background('#59934C'); break;
    case 'light': background('#8EC183'); break;
    default: background('#3A6331');
  }

  let fragranceValue = parseInt(teaProduct.Fragrance);
  let baseSizeMultiplier = pow(map(fragranceValue, 1, 10, 0.5, 2.2), 1.8);
  let strength = parseInt(teaProduct.Strength);
  mirrorVertical = false;

  let sectionHeight = height / sections;
  for (let s = 0; s < sections; s++) {
    let yOffset = s * sectionHeight + sectionHeight/2;
    let xBase = width/2;
    drawMirrored(xBase, yOffset, baseSizeMultiplier, 'spiral', sectionHeight, strength);
  }

  drawAllFlowers();
  drawGradientRect(0, 0, width, 200, colorMode);
  drawProductInfo(teaProduct);
}

function drawGradientRect(x, y, w, h, colorModeStr) {
  // Base gradient color depending on Body
  let startColor;
  switch (colorModeStr) {
    case 'rich':
      startColor = color('#2C4A25'); // deeper forest green
      break;
    case 'medium':
      startColor = color('#4E7E3D'); // balanced green
      break;
    case 'light':
      startColor = color('#A8D7A0'); // gentle mint tone
      break;
    default:
      startColor = color('#3A6331');
  }

  // Fade from that color to transparent
  let endColor = color(red(startColor), green(startColor), blue(startColor), 0);

  push();
  noFill();
  for (let i = 0; i < h; i++) {
    let inter = map(i, 0, h - 1, 0, 1);
    let c = lerpColor(startColor, endColor, inter);
    stroke(c);
    line(x, y + i, x + w, y + i);
  }
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
}
function draw() {}