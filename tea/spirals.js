let canvas;

/*
split canvas in 3 sections horizontally 
vertical mirroring 

have spiral,sine wave, irregular texture functions - that can let lines branch off of each other

flower function that draws the function and randomly places it on the lines - OR place flowers at the ends of each line so the lines look less rough

texture function that makes the lines more sharp/angular 

color buttons for rich/medium/light

shaders to create embossing texture appearance - old p5js sketch 

somehow add thick and thin spots on the floral vines 
*/ 

function setup() {
  canvas = createCanvas(1000, 800);
  canvas.parent('canvas-container');
  noFill();
  background(0);

//   logSpirals();
  sineWaves(5);
  sineWaves(15);
  sineWaves(30);
  sineWaves(45);


}

function logSpirals(){
    push();
    noFill();

    spiral(15, 4, 350, 400);
    spiral(17, 2, 380, 400);
    spiral(19, 1, 400, 400)
    
    pop();
    
}


// spiral(15, 3, 350, 400) <<OG spiral
function spiral(radiusScale, angleScale, xPos, yPos){
    beginShape();
    for (let t = 0; t <= 0.5; t += 0.01) {
        strokeWeight(2);
        stroke(255, map(t, 0, 1, 255, 200));
        
        //ADJUSTABLE PARAMETERS
        // Fibonacci spiral coordinates
        let radius = 10 * pow(1.618, radiusScale * t);  // Smaller initial radius, faster expansion
        let angle = angleScale * TWO_PI * t;           // Keep the same number of turns
        let x = xPos + radius * cos(angle);
        let y = yPos + radius * sin(angle);
        
        curveVertex(x, y);
    }
    endShape();
}

//making sine wave with irregularities
function sineWaves(amp){
    beginShape();
    strokeWeight(2);
    stroke(255);
    for (let x = 0; x < width; x++) {
        // Map x position to angle (0 to TWO_PI)
        let angle = map(x, 0, width, 0, TWO_PI);
        
        // Calculate y using sine
        // amplitude * sin(angle * frequency) + vertical offset
        let y = amp * sin(angle * 2) + height/2;
        vertex(x, y);
    }

    endShape();
}



function draw(){}