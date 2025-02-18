// let targetX, targetY;
// let currentX, currentY;

// function preload() {
//   sharpie = loadImage('assets/sharpie.png');
//   file = loadImage('assets/flag.png');
// }
// function setup() {
//     let canvas = createCanvas(windowWidth, windowHeight);
//     canvas.parent('p5-canvas');
//     imageMode(CENTER);

//   targetX = mouseX;
//   targetY = mouseY;
//   currentX = mouseX;
//   currentY = mouseY;
// }
// function draw() {
//   background(225,246,0);
//   noFill();

//   //lerp mouse position so its more smooth
//   currentX = lerp(currentX, mouseX, 0.1);
//   currentY = lerp(currentY, mouseY, 0.1);

//   // rect(currentX-25, currentY-45, 50, 90);
//   image(file,currentX, currentY);
//   file.resize(60, 0);

//   //ring objects
//   // let rings = [
//   //   { radius: 120, points: 22, noiseMax: 100, delay: 0.1 },
//   //   { radius: 320, points: 33, noiseMax: 120, delay: 0.08 },
//   //   { radius: 520, points: 42, noiseMax: 140, delay: 0.06 },
//   //   { radius: 720, points: 52, noiseMax: 160, delay: 0.04 }
//   // ];

//   let rings = [
//     { radius: 50, points: 24, noiseMax: 250, delay: 0.3 },
//     { radius: 220, points: 43, noiseMax: 200, delay: 0.08 },
//     { radius: 440, points: 50, noiseMax: 220, delay: 0.06 },
//     { radius: 640, points: 65, noiseMax: 350, delay: 0.04 },

//     { radius: 860, points: 70, noiseMax: 400, delay: 0.02 },
//     { radius: 1020, points: 75, noiseMax: 450, delay: 0.01 },
//     { radius: 1240, points: 80, noiseMax: 500, delay: 0.01 }
//   ];

//   let noiseOffset1 = 1.5;
//   let noiseOffset2 = 2.8;

//   //creating rings with multiple vertcies -- place a pen at each vertice
//   for(let ring of rings){
//     let vertices = [];

//     // Calculate vertices for this ring
//     for (let i=0; i<ring.points; i++){
      
//       let angle = map(i, 0, ring.points, 0, TWO_PI); //zero to two-pi = 360 degrees
//       let noiseFactor = noise(
        
//         //cos(angle) gives the x-coord on a unit circle.
//         //sin(angle) gives the y-coord on a unit circle.
//         //add 0.5 and 0.3 to prevent symmetry 
//         cos(angle) * noiseOffset1 + 0.5, 
//         sin(angle) * noiseOffset2 + 0.3
//       ) * ring.noiseMax;

      
//       // Calculate target position for this vertex
//       let targetPosX = mouseX + cos(angle) * (ring.radius + noiseFactor);
//       let targetPosY = mouseY + sin(angle) * (ring.radius + noiseFactor);

//       // Lerp from current center to target position with ring-specific delay
//       let x = lerp(currentX + cos(angle) * (ring.radius + noiseFactor), 
//                    targetPosX, ring.delay);
//       let y = lerp(currentY + sin(angle) * (ring.radius + noiseFactor), 
//                    targetPosY, ring.delay);
//       vertices.push({x, y, targetX: targetPosX, targetY: targetPosY});
//     }

//     // Draw sharpies for this ring
//     for (let v of vertices) {
//       push();
//       translate(v.x, v.y);

//       // Calculate current and target angles
      
//       //atan2(y, x) finds the angle between two points.
//       // currentAngle is the angle from the sharpie to current mouse pos.
//       // targetAngle is the angle from the sharpie to the target mouse pos.
//       let currentAngle = atan2(currentY - v.y, currentX - v.x);
//       let targetAngle = atan2(mouseY - v.targetY, mouseX - v.targetX);

//       //lerp the rotation btwn where the sharpie is pointing now (current) vs. where it should point (target)
//       let lerpedAngle = lerp(currentAngle, targetAngle, ring.delay);
      
//       //rotate to face sharpie twards mouse
//       let angleToCenter = atan2(mouseY - v.y, mouseX - v.x);
//       rotate(angleToCenter + PI/2);

//       //making sharpies on the outer rings gradually larger
//       let sharpieHeight = map(ring.radius, 120, 420, 200, 280);
//       let sharpieWidth = map(ring.radius, 120, 420, 25, 35);
      
//       image(sharpie, 0, 0, sharpieWidth, sharpieHeight);
//       pop();
//     }

//     function windowResized() {
//         resizeCanvas(windowWidth, windowHeight);
//     }

//     //guide
//     // beginShape();
//     // for (let v of vertices) {
//     //   vertex(v.x, v.y);
//     // }
//     // endShape(CLOSE);
//   }
// } 

let targetX, targetY; //target pos of mouse
let currentX, currentY; //smoothed pos of  mouse

let pens = []; 
let totalPensLoaded = 0; // Counter to keep track of total loaded pens
let lastPenAddTime = 0; // Timestamp of last added pen


function preload() {
  sharpie = loadImage('assets/sharpie.png'); 
  file = loadImage('assets/flag.png'); 
}

function setup() {
  let canvas = createCanvas(2000, 1200);
  canvas.parent('p5-canvas');
  imageMode(CENTER); 

  targetX = mouseX;
  targetY = mouseY;
  currentX = mouseX;
  currentY = mouseY;
}

function draw() {
  background(225, 246, 0); 
  noFill(); 
  
  //lerping mouse position to create smooth 'delay' effect
  currentX = lerp(currentX, mouseX, 0.1);
  currentY = lerp(currentY, mouseY, 0.1);
  

  image(file, currentX, currentY);
    file.resize(60, 0);

//   file.resize(500, 0);

  //ring objects
  let rings =[
    { radius: 50, points: 35, noiseMax: 250, delay: 0.3 },
    { radius: 220, points: 53, noiseMax: 200, delay: 0.08 },
    { radius: 440, points: 75, noiseMax: 220, delay: 0.06 },
    { radius: 640, points: 80, noiseMax: 350, delay: 0.04 },
    { radius: 860, points: 82, noiseMax: 400, delay: 0.02 },
    { radius: 1020, points: 85, noiseMax: 450, delay: 0.01 },
    { radius: 1240, points: 90, noiseMax: 500, delay: 0.01 }
  ];
  
  //adding noise to circlular shape -- framecount for animation
  let noiseOffset1 = frameCount * 0.005;
  let noiseOffset2 = frameCount * 0.003;
  
  // Add new pens periodically based on time intervals
  if (millis() - lastPenAddTime > 10 && totalPensLoaded < getTotalPens(rings)) {
    let ringIndex = floor(random(rings.length)); // Pick a random ring
    let ring = rings[ringIndex];
    
    // Add a new pen at a random point in the selected ring
    //// & pick a random point on the ring
    pens.push({
      ringIndex: ringIndex,
      pointIndex: floor(random(ring.points)), 
      alpha: 0 // Start with zero opacity
    });

    totalPensLoaded++;
    lastPenAddTime = millis(); // Update last pen added timestamp
  }
  
  // Iterate through each ring to create the wave effect
  for (let ringIndex = 0; ringIndex < rings.length; ringIndex++) {
    let ring = rings[ringIndex];
    let vertices = []; // Store computed points for the ring
    
    for (let i = 0; i < ring.points; i++) {
      let angle = map(i, 0, ring.points, 0, TWO_PI); // Map points around a circle

      // Generate noise-based movement for a more dynamic effect
      let noiseFactor = noise(
        cos(angle) * noiseOffset1 + frameCount * 0.02, 
        sin(angle) * noiseOffset2 + frameCount * 0.02
      ) * ring.noiseMax;
      
      // Calculate target positions based on mouse movement
      let targetPosX = mouseX + cos(angle) * (ring.radius + noiseFactor);
      let targetPosY = mouseY + sin(angle) * (ring.radius + noiseFactor);
      
      // Smoothly move towards target position using lerp
      let x = lerp(currentX + cos(angle) * (ring.radius + noiseFactor), targetPosX, ring.delay);
      let y = lerp(currentY + sin(angle) * (ring.radius + noiseFactor), targetPosY, ring.delay);
      
      // Store vertex information
      vertices.push({x, y, targetX: targetPosX, targetY: targetPosY});
    }
    
    // Draw pens on their assigned points in the rings
    for (let pen of pens) {
      
      if (pen.ringIndex === ringIndex) {
        let v = vertices[pen.pointIndex]; // Get assigned vertex position
        if (v) {
          push();
          translate(v.x, v.y); // Move pen to computed position
          
          // Rotate pen to face the center of the rings
          let angleToCenter = atan2(mouseY - v.y, mouseX - v.x);
          rotate(angleToCenter + PI/2);
          
          // Gradually increase the opacity of the pen
          pen.alpha = min(pen.alpha + 10, 255);
          tint(255, pen.alpha);
          
          //making sharpies on the outer rings gradually larger
          let sharpieHeight = map(ring.radius, 50, 1240, 100, 650); 
          let sharpieWidth = map(ring.radius, 50, 1240, 15, 80); 
          image(sharpie, 0, 0, sharpieWidth, sharpieHeight); 
          
          pop();
        }
      }
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }
  }
}

// Function to calculate total number of points in all rings
function getTotalPens(rings) {
  return rings.reduce((total, ring) => total + ring.points, 0);
}
