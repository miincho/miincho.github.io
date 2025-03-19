let slider, waveSlider, noiseSlider;
let weatherData = { lat: 0, lon: 0, precipitation: 0, windSpeed: 0 };
let randomStrands =[];
let randomStrand2 = [];

function preload() {
    font = loadFont('assets/neue.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);4

    for (let i = 0; i < 100; i++) { // Adjust size based on expected points
        randomStrands.push([random(-5, 5), random(-5, 5)]);
    }

    for (let i = 0; i < 100; i++) { // Adjust size based on expected points
        randomStrand2.push([random(-5, 5), random(-5, 5)]);
    }

    setupFrizzControls();

    slider = createSlider(0, 1, 0, 0.1);
    slider.position(10, 50);

    // Wave motion intensity slider
    waveSlider = createSlider(0, 20, 0, 0.1); 
    waveSlider.position(10, 80);
    
    // Noise intensity slider
    noiseSlider = createSlider(0, 10, 0, 0.1); 
    noiseSlider.position(10, 110);

    //thickness
    weight = createSlider(1,5,2.5,0.5);
    weight.position(10, 140);

    //thickness2
    weight2 = createSlider(0,10,5,0.5);
    weight2.position(10, 170);
}

function draw() {
    noStroke();
    clear();
    // background(0);
    fill("deeppink");
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(200);
    text('INFRINGE', windowWidth/2, windowHeight/2);

    const w = weight.value();
    const w2 = weight2.value();
    // const t = slider.value();

    const hairSlider = slider.value();
    const t = hairMap(hairSlider);

    const waveIntensity = waveSlider.value();
    const noiseIntensity = noiseSlider.value();

    //draw each shape twice so theres two strokes - one shape with larger stroke 
    //outer stroke
    noFill();
    strokeWeight( w2);  
    stroke('rgb(255,255,255)');  
    
    //letter spacing + positioning
    const letterSpacings = [80, 140, 120, 130, 60, 150, 150, 85];
    const totalWidth = letterSpacings.reduce((sum, space) => sum + space, 0);
    const startX = (windowWidth / 2) - (totalWidth / 2) - 20;
    const startY = windowHeight / 2 - 65;
    let xOffset = startX;
    
    //drawing each letter w outer stroke
    letters.forEach((letter, index) => {
        push();
        translate(xOffset, startY);
        drawLetter(letter.curly, letter.coily, t, index, waveIntensity, noiseIntensity);
        pop();
        xOffset += letterSpacings[index];
    });

    //inner stroke
    xOffset = startX;
    noFill();
    strokeWeight(w);
    stroke('rgba(0, 0, 0, 0.9)');
    
    //drawing each letter w inner stroke
    letters.forEach((letter, index) => {
        push();
        translate(xOffset, startY);
        drawLetter(letter.curly, letter.coily, t, index, waveIntensity, noiseIntensity);
        pop();
        xOffset += letterSpacings[index];
    });
}

function drawLetter(curly, straight, t, index, waveIntensity, noiseIntensity) {
    // Draw the main hair strand with frizz
    beginShape();
    
    // Start point
    const startPoint = applyEffects(lerpPoint(curly[0], straight[0], t), index, waveIntensity, noiseIntensity);
    vertex(startPoint[0], startPoint[1]);

    const frizzAmount = frizzSlider.value();
    const frizzFrequency = frizzCountSlider.value();
    
    for (let i = 1; i < curly.length; i++) {
        // Interpolate and apply effects to each control point separately
        const cp1 = applyEffects(lerpPoint([curly[i][0], curly[i][1]], [straight[i][0], straight[i][1]], t), i * 3, waveIntensity, noiseIntensity);
        const cp2 = applyEffects(lerpPoint([curly[i][2], curly[i][3]], [straight[i][2], straight[i][3]], t), i * 3 + 1, waveIntensity, noiseIntensity);
        const p = applyEffects(lerpPoint([curly[i][4], curly[i][5]], [straight[i][4], straight[i][5]], t), i * 3 + 2, waveIntensity, noiseIntensity);
        
        // Add frizz by modifying the control points with tight wave patterns
        const frizzyCP1 = addFrizz(cp1, i * 3, frizzAmount, frizzFrequency);
        const frizzyCP2 = addFrizz(cp2, i * 3 + 1, frizzAmount, frizzFrequency);
        const frizzyP = addFrizz(p, i * 3 + 2, frizzAmount, frizzFrequency);
        
        // Draw the bezier curve with frizzy control points
        bezierVertex(frizzyCP1[0], frizzyCP1[1], frizzyCP2[0], frizzyCP2[1], frizzyP[0], frizzyP[1]);
        bezierVertex(frizzyCP1[0], frizzyCP1[1], frizzyCP2[0], frizzyCP2[1], frizzyP[0], frizzyP[1]);

    }
    
    endShape();
}

// Function to add frizz effect to a point
function addFrizz(point, seed, amount, frequency) {
    if (!Array.isArray(point) || point.length < 2) return point;
    
    // Use perlin noise to create natural-looking frizz
    const noiseScale = 0.3;
    const noiseVal1 = noise(point[0] * noiseScale, point[1] * noiseScale, seed * 0.1);
    const noiseVal2 = noise(point[0] * noiseScale, point[1] * noiseScale, (seed + 100) * 0.1);
    
    // Create tight wave pattern with high frequency
    const waveX = sin(point[0] * frequency * 0.1 + noiseVal1 * TWO_PI) * amount;
    const waveY = sin(point[1] * frequency * 0.1 + noiseVal2 * TWO_PI) * amount;
    
    return [
        point[0] + waveX,
        point[1] + waveY
    ];
}

function setupFrizzControls() {
    // Frizz amount - how much the strand deviates from the original path
    frizzSlider = createSlider(0, 10, 1, 0.1);
    frizzSlider.position(10, 200);
    
    // Frizz frequency - how tight/frequent the waves are
    frizzCountSlider = createSlider(0.5, 10, 2, 0.1);
    frizzCountSlider.position(10, 230);
    
    // Create labels for the sliders
    const labelY = 15;
    const labels = [
        { text: "Hair Type", y: 50 - labelY },
        { text: "Wave Motion", y: 80 - labelY },
        { text: "Noise", y: 110 - labelY },
        { text: "Inner Line", y: 140 - labelY },
        { text: "Outer Line", y: 170 - labelY },
        { text: "Frizz Amount", y: 200 - labelY },
        { text: "Frizz Tightness", y: 230 - labelY }
    ];
    
    createElement('style', `
        .slider-label {
            color: black;
            font-family: sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
            position: absolute;
            left: 10px;
        }
    `);
    
    labels.forEach(label => {
        const el = createElement('p', label.text);
        el.addClass('slider-label');
        el.position(10, label.y);
    });
}

function hairMap(value){
    if(value<0.5){
        return Math.pow(value*2, 3)/2
    }else{
        return 1 - Math.pow((1-value)*2,3)/2
    }
}

//lerping bezier curves
function lerpPoint(p1, p2, t) {
    if (Array.isArray(p1) && Array.isArray(p2)) {
        return [
            lerp(p1[0], p2[0], t),
            lerp(p1[1], p2[1], t)
        ];
    }
    return p1; // Fallback
}

// Apply wave and random noise effects
// Apply wave and noise effects to a point
function applyEffects(point, seed, waveIntensity, noiseIntensity) {
    if (!Array.isArray(point) || point.length < 2) return point;
    
    const time = frameCount * 0.01;
    const waveEffect = sin(time * 2 + seed) * waveIntensity;
    
    // Use noise for more natural movement
    const noiseX = noise(seed * 0.1, time, 0) * noiseIntensity;
    const noiseY = noise(seed * 0.1, 0, time) * noiseIntensity;
    
    return [
        point[0] + waveEffect * 0.5 + noiseX,
        point[1] + waveEffect * 0.5 + noiseY
    ];
}

// Smooth/silky wave effect
function waveMotion(point, index, intensity) {
    let waveStrength = intensity;
    let frequency = 0.2; 
    let phase = index * 0.3;
    let time = millis() * 0.001; 
    
    let xOffset = waveStrength * sin( frequency + phase);
    let yOffset = waveStrength * cos(frequency + phase);

    return [point[0] + xOffset, point[1] + yOffset];
}

//jiter effect based on slider value
function randomEffect(point, intensity) {
    let jitter = intensity * 0.5; 
    let rX = random(-jitter, jitter);
    let rY = random(-jitter, jitter);

    return [point[0] + rX, point[1] + rY];
}
