let userLat, userLon;
// let weatherData = {};
let p5Canvas = document.getElementById("canvas");
let latDiv = document.getElementById("lat");
let lonDiv = document.getElementById("lon");
let windDiv = document.getElementById("wind");
let humidityDiv = document.getElementById("humidity");
let tempDiv = document.getElementById("temp");

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// async function userLocation() {
//     try {
//         const response = await fetch('http://ip-api.com/json/');
//         if (!response.ok) throw new Error(`Failed to fetch location: ${response.status}`);
        
//         const data = await response.json();
//         userLat = data.lat;
//         userLon = data.lon;
        
//         latDiv.innerHTML = `Latitude: ${userLat}`;
//         lonDiv.innerHTML = `Longitude: ${userLon}`;

//         await fetchWeather(userLat, userLon);
//     } catch (error) {
//         console.error("Error fetching IP location:", error);
//     }
// }

// async function fetchWeather(lat, lon) {
//     try {
//         const corsProxy = "https://cors-anywhere.herokuapp.com/";
//         const apiKey = "00f4094ad2731e49cd2ea6d2821bda4f";
//         const url = `${corsProxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&exclude=daily&appid=${apiKey}`;
        

//         const response = await fetch(url);
//         if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
//         const result = await response.text();
//         const data = JSON.parse(result);
//         console.log("Weather Data:", data);

//         weatherData = {
//             temp: data.main.temp,
//             humidity: data.main.humidity,
//             wind: data.wind.speed
//         };

//         tempDiv.innerHTML = `Temperature: ${weatherData.temp} °F`;
//         humidityDiv.innerHTML = `Humidity: ${weatherData.humidity}%`;
//         windDiv.innerHTML = `Wind Speed: ${weatherData.wind} mph`;

//         /*
//             Temperature -  Multiple strands of hair (hair tied when its hot, down when its cold
//             Humidity - frizz, duplicate overlap?
//             Wind Speed - wave motion
//             Latitude, Longitude - hair type
//             Time of Day - color scheme, hair volume...
//         */
        
//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//     }
// }

//start function
// userLocation();


let slider, waveSlider, noiseSlider;
let weatherData = { 
    lat: 40, 
    lon: 125,
    temp: 55,
    humidity: 50,
    wind: 9
};
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

    setupFrizzControls();

    slider = createSlider(0, 1, 0, 0.1);
    slider.position(0, 0);

    // Wave motion intensity slider
    waveSlider = createSlider(0, 20, 0, 0.1); 
    waveSlider.position(0, 80);
    
    // Noise intensity slider
    noiseSlider = createSlider(0, 10, 0, 0.1); 
    noiseSlider.position(0, 110);

    // thickness
    weight = createSlider(1,5,2.5,0.5);
    weight.position(0, 140);

    //thickness2
    weight2 = createSlider(0,10,5,0.5);
    weight2.position(0, 170);
}

function draw() {
    noStroke();
    clear();
    // background(0);
    fill("#ffffff");
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(280);
    text('INFRINGE', windowWidth/2, windowHeight/2);

    textFont(bodyFont);
    textSize(50);
    // text('Anthropology of Hair', windowWidth/2, windowHeight/2.5 + 180);

    const w = weight.value();
    const w2 = weight2.value();
    // const w = 2.5;
    // const w2 = 5;
    // const t = slider.value();

    const hairSlider = slider.value();
    const t = hairMap(hairSlider);

    // const waveValue = waveSlider.value();
    const waveIntensity = waveSlider.value();
    const noiseIntensity =  noiseSlider.value();

    // const waveIntensity = 0;
    // const noiseIntensity =  0;

    //draw each shape twice so theres two strokes - one shape with larger stroke 
    //outer stroke
    noFill();
    strokeWeight( w2);  
    stroke('#000000');  
    
    //letter spacing + positioning
    const letterSpacings = [95, 200, 170, 190, 85, 200, 205, 100];
    const totalWidth = letterSpacings.reduce((sum, space) => sum + space, 0);
    const startX = (windowWidth / 2) - (totalWidth / 2) - 45;
    const startY = windowHeight / 2.45;
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
    stroke('#ffffff');
    
    //drawing each letter w inner stroke
    letters.forEach((letter, index) => {
        push();
        translate(xOffset, startY);
        drawLetter(letter.straight, letter.curly, t, index, waveIntensity, noiseIntensity);
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


    // const frizzAmount = 0;
    // const frizzFrequency = 0;

    const frizzAmount = frizzSlider.value();
    const frizzFrequency = frizzCountSlider.value();
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

        bezierVertex(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
        // bezierVertex(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);

        //adding a "dryness" --> the dryer the more shaper and edgy it gets 
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

function setupFrizzControls() {

    // Frizz amount - how much the strand deviates from the original path
    frizzSlider = createSlider(0, 10, 0, 0.1);
    frizzSlider.position(0, 200);
    
    // Frizz frequency - how tight/frequent the waves are
    frizzCountSlider = createSlider(0.5, 10, 0, 0.1);
    frizzCountSlider.position(0, 230);
    
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
        return Math.pow(value*2, 4)/2
    }else{
        return 1 - Math.pow((1-value)*2,4)/2
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
// Apply wave and noise effects to a point
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
// Smooth/silky wave effect
// function waveMotion(point, index, intensity) {
//     let waveStrength = intensity;
//     let frequency = 0.2; 
//     let phase = index * 0.3;
//     let time = millis() * 0.001; 
    
//     let xOffset = waveStrength * sin(time +  frequency + phase);
//     let yOffset = waveStrength * cos(time + frequency + phase);

//     return [point[0] + xOffset, point[1] + yOffset];
// }

//jiter effect based on slider value
// function randomEffect(point, intensity) {
//     let jitter = intensity * 0.5; 
//     let rX = random(-jitter, jitter);
//     let rY = random(-jitter, jitter);

//     return [point[0] + rX, point[1] + rY];
// }

// soft, coarse/dry, (sine wave, edgyness)
// wet, frizzy 

//adjust control points so it takes the curve out farther 
// add secondary strand witch slightly different coordinates
//

//adding frizz 
// between every two anchor points, add 5 more control points evenly spaced 
// make an undulating wave shape between all the anchor points 