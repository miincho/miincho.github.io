let slider, waveSlider, noiseSlider;
let weatherData = { lat: 0, lon: 0, precipitation: 0, windSpeed: 0 };

function preload() {
    font = loadFont('assets/neue.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    slider = createSlider(0, 1, 0, 0.01);
    slider.position(10, 50);

    // Wave motion intensity slider
    waveSlider = createSlider(0, 20, 8, 0.1); 
    waveSlider.position(10, 80);
    
    // Noise intensity slider
    noiseSlider = createSlider(0, 30, 5, 0.1); 
    noiseSlider.position(10, 110);

    //thickness
    weight = createSlider(1,5,2.5,0.5);
    weight.position(10, 140);
    
}

function draw() {
    noStroke();
    background(250);
    fill('deeppink');
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(200);
    text('INFRINGE', windowWidth/2, windowHeight/2);

       // Update effect values based on weather
    //    const t = map(weatherData.lat + weatherData.lon, -180, 180, 0, 1); // Mapping long/lat to morphing effect
    //    const waveIntensity = map(weatherData.precipitation, 0, 50, 0, 20); // Map precipitation to waves
    //    const noiseIntensity = map(weatherData.windSpeed, 0, 100, 0, 30); // Map wind speed to noise
   
    
    const w = weight.value();
    noFill();
    strokeWeight(w);
    stroke('rgba(0, 0, 0, 0.5)');
    frameRate(15);

    // Get slider values
    const t = slider.value();
    const waveIntensity = waveSlider.value();
    const noiseIntensity = noiseSlider.value();

    // Custom spacing for each letter
    const letterSpacings = [80, 140, 120, 130, 60, 150, 150, 85];
    const totalWidth = letterSpacings.reduce((sum, space) => sum + space, 0);
    const startX = (windowWidth / 2) - (totalWidth / 2) - 20; // Centering the word
    const startY = windowHeight / 2 - 65; // Vertical center

    let xOffset = startX;
    
    // Draw each letter
    letters.forEach((letter, index) => {
        push();
        translate(xOffset, startY);
        
        // drawingContext.lineWidth = w * 2;  // Double the width
        // drawingContext.lineJoin = 'round';  // Soften the corners
        // drawingContext.strokeStyle = 'rgba(255, 0, 0, 0.8)';  // Outer stroke color

        drawLetter(letter.wavy, letter.coily, t, index, waveIntensity, noiseIntensity);
        pop();
        xOffset += letterSpacings[index]; // Move to the next letter position
    });
    
    noStroke();
    textSize(14);
    text("Morphing: " + Math.round(t * 100) + "%", 120, 515);
}

function drawLetter(curly, straight, t, index, waveIntensity, noiseIntensity) {
    beginShape();
    
    // Apply effects to the first vertex (starting point)
    const startPoint = applyEffects(lerpPoint(curly[0], straight[0], t), index, waveIntensity, noiseIntensity);
    vertex(startPoint[0], startPoint[1]);

    for (let i = 1; i < curly.length; i++) {
        // Interpolate and apply effects to each control point separately
        const cp1 = applyEffects(lerpPoint([curly[i][0], curly[i][1]], [straight[i][0], straight[i][1]], t), i * 3, waveIntensity, noiseIntensity);
        const cp2 = applyEffects(lerpPoint([curly[i][2], curly[i][3]], [straight[i][2], straight[i][3]], t), i * 3 + 1, waveIntensity, noiseIntensity);
        const p = applyEffects(lerpPoint([curly[i][4], curly[i][5]], [straight[i][4], straight[i][5]], t), i * 3 + 2, waveIntensity, noiseIntensity);

        // bezierVertex(cp1[0]+ random(-5,5), cp1[1] + random(-5,5), cp2[0] + random(-5,5), cp2[1] + random(-5,5), p[0] + random(-5,5), p[1] + random(-5,5));
        bezierVertex(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
    }
    
    endShape();
}


// Interpolate Bezier curves
function lerpPoint(p1, p2, t) {
    return [
        lerp(p1[0], p2[0], t),
        lerp(p1[1], p2[1], t)
    ];
}

// Apply wave and random noise effects
function applyEffects(point, index, waveIntensity, noiseIntensity) {
    let wavedPoint = waveMotion(point, index, waveIntensity);
    let randomizedPoint = randomEffect(wavedPoint, noiseIntensity);
    return randomizedPoint;
}

// Smooth/silky wave effect
function waveMotion(point, index, intensity) {
    let waveStrength = intensity;
    let frequency = 0.2; // Slow, subtle movement
    let phase = index * 0.3; // Staggered wave effect
    let time = millis() * 0.001; // Continuous motion
    
    let xOffset = waveStrength * sin(time * frequency + phase);
    let yOffset = waveStrength * cos(time * frequency + phase);

    return [point[0] + xOffset, point[1] + yOffset];
}

// Apply random jitter effect instead of Perlin noise
function randomEffect(point, intensity) {
    let jitter = intensity * 0.2; // Scale randomness based on slider
    let rX = random(-jitter, jitter);
    let rY = random(-jitter, jitter);

    return [point[0] + rX, point[1] + rY];
}