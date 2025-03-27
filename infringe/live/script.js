let userLat, userLon;

let p5Canvas = document.getElementById("canvas");
let latDiv = document.getElementById("lat");
let lonDiv = document.getElementById("lon");
let windDiv = document.getElementById("wind");
let humidityDiv = document.getElementById("humidity");
let tempDiv = document.getElementById("temp");

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

//1
let weatherData = { 
    lat: 40, 
    lon: 125,
    temp: 10,
    humidity: 0,
    wind: 0
};


// 2 mag 2 logo
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 30,
//     humidity: 20,
//     wind: 5
// };


// //3
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 50,
//     humidity: 40,
//     wind: 20
// };


// //4
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 70,
//     humidity: 60,
//     wind: 50
// };

// //5
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 30,
//     humidity: 20,
//     wind: 10
// };

// //6
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 50,
//     humidity: 40,
//     wind: 30
// };

// //7
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 70,
//     humidity: 60,
//     wind: 60
// };

// //8
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 90,
//     humidity: 80,
//     wind: 80
// };

// //9
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 50,
//     humidity: 40,
//     wind: 40
// };

// //10
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 70,
//     humidity: 60,
//     wind: 70
// };

// //11
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 90,
//     humidity: 80,
//     wind: 90
// };

// //12
// let weatherData = { 
//     lat: 40, 
//     lon: 125,
//     temp: 110,
//     humidity: 100,
//     wind: 100
// };


tempDiv.innerHTML = `Temperature: ${weatherData.temp} °F`;
humidityDiv.innerHTML = `Humidity: ${weatherData.humidity}%`;
windDiv.innerHTML = `Wind Speed: ${weatherData.wind} mph`;
latDiv.innerHTML = `Latitude: ${weatherData.lat}`;
lonDiv.innerHTML = `Longitude: ${weatherData.lon}`;

let randomStrands =[];
let randomStrand2 = [];
const textSizeReference = 145; // The text size used
const scaleFactor = textSizeReference / 100; // Adjust based on letter data scale

function preload() {
    font = loadFont('../assets/neue.otf');
    bodyFont = loadFont('../assets/bodyneue.otf');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas");

    for (let i = 0; i < 100; i++) { // Adjust size based on expected points
        randomStrands.push([random(-3, 3), random(-3, 3)]);
    }

    for (let i = 0; i < 100; i++) { // Adjust size based on expected points
        randomStrand2.push([random(-5, 5), random(-5, 5)]);
    }

    // slider = createSlider(0, 1, 0, 0.1);
    // slider.position(0, 0);

}

function draw() {
    noStroke();
    clear();
    // background(0);
    fill("#D70000");
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(280);
    text('INFRINGE', windowWidth/2, windowHeight/2);

    const w = 2.5;
    const w2 = 5;

    //value from 0 to 1 in incrmeents of 0.1
    t = hairMap(0.2);

    // const waveValue = waveSlider.value();
    const waveIntensity = map(weatherData.wind, 0, 100, 0, 150);
    const noiseIntensity =  map(weatherData.wind, 0, 100, 0, 100);

    //draw each shape twice so theres two strokes - one shape with larger stroke 
    //outer stroke
    noFill();
    strokeWeight( w2);  
    stroke('#777777');  
    
    //letter spacing + positioning
    const letterSpacings = [95, 200, 170, 190, 85, 200, 205, 100];
    const totalWidth = letterSpacings.reduce((sum, space) => sum + space, 0);
    const startX = (windowWidth / 2) - (totalWidth / 2) - 35;
    const startY = windowHeight / 2.55;
    let xOffset = startX;
    
    //drawing each letter w outer stroke
    letters.forEach((letter, index) => {
        push();
        translate(xOffset, startY);
        drawLetter(letter.straight, letter.wavy, t, index, waveIntensity, noiseIntensity);
        pop();
        xOffset += letterSpacings[index];
    });

    //inner stroke
    xOffset = startX;
    noFill();
    strokeWeight(w);
    stroke('#000000');
    //drawing each letter w inner stroke
    letters.forEach((letter, index) => {
        push();
        translate(xOffset, startY);
        drawLetter(letter.straight, letter.wavy, t, index, waveIntensity, noiseIntensity);
        pop();
        xOffset += letterSpacings[index];
    });
}

function drawLetter(hairType1, hairType2, t, index, waveIntensity, noiseIntensity) {
    beginShape();
    const scale = scaleFactor;
    
    //vertex is starting point 
    const startPoint = applyEffects(lerpPoint(hairType1[0], hairType2[0], t, scale), index, waveIntensity, noiseIntensity);
    vertex(startPoint[0], startPoint[1]);

    const hairFrizz = map(weatherData.humidity, 0, 100, 0, 5);
    const windEffect = map(weatherData.wind, 0, 253, 0, 2.5);

    const frizzAmount = hairFrizz;
    const frizzFrequency = windEffect;
    // console.log(frizzAmount)

    for (let i = 1; i < hairType1.length; i++) {
        // Interpolate and apply effects to each control point separately
        const cp1 = applyEffects(scalePoint(lerpPoint([hairType1[i][0], hairType1[i][1]], [hairType2[i][0], hairType2[i][1]], t), scale), i * 3, waveIntensity, noiseIntensity);
        const cp2 = applyEffects(scalePoint(lerpPoint([hairType1[i][2], hairType1[i][3]], [hairType2[i][2], hairType2[i][3]], t), scale), i * 3 + 1, waveIntensity, noiseIntensity);
        const p = applyEffects(scalePoint(lerpPoint([hairType1[i][4], hairType1[i][5]], [hairType2[i][4], hairType2[i][5]], t), scale), i * 3 + 2, waveIntensity, noiseIntensity);

        
        // Add frizz by modifying the control points with tight wave patterns
        const frizzyCP1 = addFrizz(cp1, i * 3, frizzAmount, frizzFrequency);
        const frizzyCP2 = addFrizz(cp2, i * 3 + 1, frizzAmount, frizzFrequency);
        const frizzyP = addFrizz(p, i * 3 + 2, frizzAmount, frizzFrequency);


        // bezierVertex(frizzyCP1[0], frizzyCP1[1], frizzyCP2[0], frizzyCP2[1], frizzyP[0], frizzyP[1]);
        bezierVertex(frizzyCP1[0], frizzyCP1[1], frizzyCP2[0], frizzyCP2[1], frizzyP[0], frizzyP[1]);

        //add parameter to add multiple hairs 
        // bezierVertex(cp1[0]+ random(-5,5), cp1[1] + random(-5,5), cp2[0] + random(-5,5), cp2[1] + random(-5,5), p[0] + random(-5,5), p[1] + random(-5,5));

        // bezierVertex(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
        // bezierVertex(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
    }
    endShape();

    drawSecondaryStrand(hairType1, hairType2, t, index, waveIntensity, noiseIntensity);
}


function drawSecondaryStrand(hairType1, hairType2, t, index, waveIntensity, noiseIntensity) {
    beginShape();
    const scale = scaleFactor;

    const startPoint = applyEffects(lerpPoint(hairType1[0], hairType2[0], t), index, waveIntensity, noiseIntensity);
    vertex(startPoint[0] , startPoint[1] );

    for (let i = 1; i < hairType1.length; i++) {
        const cp1 = applyEffects(scalePoint(lerpPoint([hairType1[i][0], hairType1[i][1]], [hairType2[i][0], hairType2[i][1]], t), scale), i * 3, waveIntensity, noiseIntensity);
        const cp2 = applyEffects(scalePoint(lerpPoint([hairType1[i][2], hairType1[i][3]], [hairType2[i][2], hairType2[i][3]], t), scale), i * 3 + 1, waveIntensity, noiseIntensity);
        const p = applyEffects(scalePoint(lerpPoint([hairType1[i][4], hairType1[i][5]], [hairType2[i][4], hairType2[i][5]], t), scale), i * 3 + 2, waveIntensity, noiseIntensity);

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

function hairMap(value){
    if(value<0.5){
        return Math.pow(value*2, 3)/2
    }else{
        return 1 - Math.pow((1-value)*2,3)/2
    }
}

function scalePoint(point, scale) {
    return [point[0] * scale, point[1] * scale];
}

//lerping bezier curves
function lerpPoint(p1, p2, t) {
    return [
        lerp(p1[0], p2[0], t),
        lerp(p1[1], p2[1], t)
    ];
}

// Apply wave and random noise effects
function applyEffects(point, seed, waveIntensity, noiseIntensity) {
    if (!Array.isArray(point) || point.length < 2) return point;
    
    const time = frameCount * 0.01;
    const waveEffect = sin(time * 2 + seed) * waveIntensity;
    
    // Use noise for more natural movement
    const noiseX = noise(seed * 0.9, time, 0) * noiseIntensity;
    const noiseY = noise(seed * 0.9, 0, time) * noiseIntensity;
    
    return [
        point[0] + waveEffect * 0.5 + noiseX,
        point[1] + waveEffect * 0.5 + noiseY
    ];
}