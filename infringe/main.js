let slider, waveSlider, noiseSlider;
let weatherData = { lat: 0, lon: 0, precipitation: 0, windSpeed: 0 };
let randomStrands =[];
let randomStrand2 = [];


// https://openweathermap.org/current

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


    slider = createSlider(0, 1, 0.5, 0.1);
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
        drawLetter(letter.straight, letter.curly, t, index, waveIntensity, noiseIntensity);
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
        drawLetter(letter.straight, letter.curly, t, index, waveIntensity, noiseIntensity);
        pop();
        xOffset += letterSpacings[index];
    });
}

function drawLetter(curly, straight, t, index, waveIntensity, noiseIntensity) {
    beginShape();
    
    //vertex is starting point 
    const startPoint = applyEffects(lerpPoint(curly[0], straight[0], t), index, waveIntensity, noiseIntensity);
    vertex(startPoint[0], startPoint[1]);

    for (let i = 1; i < curly.length; i++) {
        // Interpolate and apply effects to each control point separately
        const cp1 = applyEffects(lerpPoint([curly[i][0], curly[i][1]], [straight[i][0], straight[i][1]], t), i * 3, waveIntensity, noiseIntensity);
        const cp2 = applyEffects(lerpPoint([curly[i][2], curly[i][3]], [straight[i][2], straight[i][3]], t), i * 3 + 1, waveIntensity, noiseIntensity);
        const p = applyEffects(lerpPoint([curly[i][4], curly[i][5]], [straight[i][4], straight[i][5]], t), i * 3 + 2, waveIntensity, noiseIntensity);

        //add parameter to add multiple hairs 
        // bezierVertex(cp1[0]+ random(-5,5), cp1[1] + random(-5,5), cp2[0] + random(-5,5), cp2[1] + random(-5,5), p[0] + random(-5,5), p[1] + random(-5,5));
        // bezierVertex(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
        bezierVertex(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
        //adding a "dryness" --> the dryer the more shaper and edgy it gets 

    }
    
    endShape();


    drawSecondaryStrand(curly, straight, t, index, waveIntensity, noiseIntensity);

}


function drawSecondaryStrand(curly, straight, t, index, waveIntensity, noiseIntensity) {

    beginShape();
    
    const startPoint = applyEffects(lerpPoint(curly[0], straight[0], t), index, waveIntensity, noiseIntensity);
    vertex(startPoint[0] + random(-2, 2), startPoint[1] + random(-2, 2));

    for (let i = 1; i < curly.length; i++) {
        const cp1 = applyEffects(lerpPoint([curly[i][0], curly[i][1]], [straight[i][0], straight[i][1]], t), i * 3, waveIntensity, noiseIntensity);
        const cp2 = applyEffects(lerpPoint([curly[i][2], curly[i][3]], [straight[i][2], straight[i][3]], t), i * 3 + 1, waveIntensity, noiseIntensity);
        const p = applyEffects(lerpPoint([curly[i][4], curly[i][5]], [straight[i][4], straight[i][5]], t), i * 3 + 2, waveIntensity, noiseIntensity);

        let offset = randomStrands[i % randomStrands.length]; // Get stored random value
        let offset2 = randomStrand2[i % randomStrand2.length]; // Get stored random value


        bezierVertex(cp1[0] + offset[0], cp1[1] + offset[1], 
                     cp2[0] + offset[0], cp2[1] + offset[1], 
                     p[0] + offset[0], p[1] + offset[1]);

        // bezierVertex(cp1[0] + offset2[0], cp1[1] + offset2[1], 
        //             cp2[0] + offset2[0], cp2[1] + offset2[1], 
        //             p[0] + offset2[0], p[1] + offset2[1]);
   

                     
    }

    endShape();
}


function moreStrands(){

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


// soft, coarse/dry, (sine wave, edgyness)
// wet, frizzy 


//adjust control points so it takes the curve out farther 
// add secondary strand witch slightly different coordinates
//

//adding frizz 
// between every two anchor points, add 5 more control points evenly spaced 
// make an undulating wave shape between all the anchor points 