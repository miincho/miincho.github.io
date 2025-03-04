let slider;

function preload() {
    font = loadFont('assets/neue.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    slider = createSlider(0, 1, 0, 0.01);
    slider.position(10, 500);
}

function draw() {
    clear();
    // background(250);
    fill('deeppink');
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(200);
    text('INFRINGE', windowWidth/2, windowHeight/2);
    
    const t = slider.value();
    noFill();
    strokeWeight(5);

    let noiseAmt = noise(0.5);

    beginShape();
    const startPoint = lerpPoint(curlyN1[0], straightN1[0], t);
    vertex(startPoint[0], startPoint[1]);
    
    for (let i = 1; i < curlyN1.length; i++) {
        let cp1 = waveMotion(lerpPoint([curlyN1[i][0], curlyN1[i][1]], [straightN1[i][0], straightN1[i][1]], t), i, t);
        let cp2 = waveMotion(lerpPoint([curlyN1[i][2], curlyN1[i][3]], [straightN1[i][2], straightN1[i][3]], t), i, t);
        let p = waveMotion(lerpPoint([curlyN1[i][4], curlyN1[i][5]], [straightN1[i][4], straightN1[i][5]], t), i, t);
            
        // Apply smoothing to control points
        let [sCp1x, sCp1y, sCp2x, sCp2y, sPx, sPy] = smoothBezier(cp1, cp2, p, 0.4);
    
        bezierVertex(sCp1x, sCp1y, sCp2x, sCp2y, sPx, sPy);
        bezierVertex(sCp1x, sCp1y, sCp2x, sCp2y, sPx, sPy); // add delay or offset

    }
    endShape();
    

    // beginShape();
    // const startPoint = lerpPoint(curlyN1[0], straightN1[0], t);     //first point is vertex
    // vertex(startPoint[0], startPoint[1]);
    // // console.log(startPoint)
    
    // //rest are bezierVertexes
    // for (let i = 1; i < curlyN1.length; i++) {

    //     //rough noise
    //     // let noiseScale = 15; 
    //     // let noiseT = 2.5;
    //     // let n1 = noise(i * 0.1, t * 0.1) * noiseScale;
    //     // let n2 = noise(i * 0.1 + 100, t * 0.1) * noiseScale;
    //     // let n3 = noise(i * 0.1 + 200, t * 0.1) * noiseScale;
    //     // let n4 = noise(i * 0.1 + 300, t * 0.1) * noiseScale;
    //     // let n5 = noise(i * 0.1 + 400, t * 0.1) * noiseScale;
    //     // let n6 = noise(i * 0.1 + 500, t * 0.1) * noiseScale;

    //     //smooth noise
    //     let noiseScale = 10; // Lower value makes noise more subtle
    //     let noiseT = 0.2; // Blends noise with the curve smoothly
    //     let tNoise = i * 0.1 + t * 0.05; // Keep noise consistent across frames
    //     let n1 = noise(tNoise) * noiseScale;
    //     let n2 = noise(tNoise + 100) * noiseScale;
    //     let n3 = noise(tNoise + 200) * noiseScale;
    //     let n4 = noise(tNoise + 300) * noiseScale;
    //     let n5 = noise(tNoise + 400) * noiseScale;
    //     let n6 = noise(tNoise + 500) * noiseScale;
    

    //     const cp1 = lerpPoint(
    //         lerpPoint([curlyN1[i][0] + n1, curlyN1[i][1] + n2], [straightN1[i][0]+n1, straightN1[i][1]+n2], t),
    //         lerpPoint([curlyN1[i][0], curlyN1[i][1]], [straightN1[i][0], straightN1[i][1]], t),
    //         noiseT
    //     );
    //     const cp2 = lerpPoint(
    //         lerpPoint([curlyN1[i][2] + n3, curlyN1[i][3] + n4], [straightN1[i][2]+n3, straightN1[i][3]+n4], t),
    //         lerpPoint([curlyN1[i][2], curlyN1[i][3]], [straightN1[i][2], straightN1[i][3]], t),
    //         noiseT
    //     );
    //     const p = lerpPoint(
    //         lerpPoint([curlyN1[i][4] + n5, curlyN1[i][5] + n6], [straightN1[i][4]+n5, straightN1[i][5]+n6], t),
    //         lerpPoint([curlyN1[i][4], curlyN1[i][5]], [straightN1[i][4], straightN1[i][5]], t),
    //         noiseT
    //     );
    
        
    //     bezierVertex(cp1[0] + noiseAmt, cp1[1], cp2[0], cp2[1], p[0], p[1]);
    //     // bezierVertex(cp1[0] + noiseAmt, cp1[1], cp2[0], cp2[1], p[0], p[1]);

        
    //     // Each bezierVertex has 6 values (3 points with x,y coords)
    //     // Format: [cp1x, cp1y, cp2x, cp2y, x, y]
    //     // const cp1 = lerpPoint([curlyN1[i][0], curlyN1[i][1]], [straightN1[i][0], straightN1[i][1]], t);
    //     // const cp2 = lerpPoint([curlyN1[i][2], curlyN1[i][3]], [straightN1[i][2], straightN1[i][3]], t);
    //     // const p = lerpPoint([curlyN1[i][4], curlyN1[i][5]], [straightN1[i][4], straightN1[i][5]], t);

    //     // bezierVertex(cp1[0] + n1, cp1[1] + n2, cp2[0] + n3, cp2[1] + n4, p[0] + n5, p[1] + n6);
    // }
    // endShape();

    // Add a label for the slider
    // fill(0);
    // noStroke();
    textSize(14);
    text("Morphing: " + Math.round(t * 100) + "%", 120, 515);
}

//interpolate bezier curves func
function lerpPoint(p1, p2, t) {
    return [
        lerp(p1[0], p2[0], t),
        lerp(p1[1], p2[1], t)
    ];
}

function waveMotion(point, index, t) {
    let waveStrength = 8; // Adjust this for more/less motion
    let frequency = 0.2; // Slow, subtle movement
    let phase = index * 0.3; // Staggered wave effect

    // let xOffset = waveStrength * sin(t * frequency + phase);
    // let yOffset = waveStrength * cos(t * frequency + phase);
    let time = millis() * 0.001; // Use time for continuous motion
    let xOffset = waveStrength * sin(time * frequency + phase);
    let yOffset = waveStrength * cos(time * frequency + phase);


    return [point[0] + xOffset, point[1] + yOffset];
}

function smoothBezier(cp1, cp2, p, factor = 0.5) {
    return [
        lerp(cp1[0], cp2[0], factor), lerp(cp1[1], cp2[1], factor),
        lerp(cp2[0], p[0], factor), lerp(cp2[1], p[1], factor),
        p[0], p[1]
    ];
}

