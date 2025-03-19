// // Define a function to select hair types based on latitude and longitude
// function getHairTypesByLocation(latitude, longitude) {
//     // Normalize latitude from -90 to 90 -> 0 to 1
//     const latNormalized = (latitude + 90) / 180;
    
//     // Normalize longitude from -180 to 180 -> 0 to 1
//     const longNormalized = (longitude + 180) / 360;
    
//     // Use latitude to determine the primary hair type
//     // Northern hemisphere tends toward straighter, southern toward curlier
//     let primaryType, secondaryType;
    
//     if (latNormalized < 0.25) {
//       // Southern regions - more coily hair
//       primaryType = 'coily';
//     } else if (latNormalized < 0.5) {
//       // Mid-southern regions - more curly hair
//       primaryType = 'curly';
//     } else if (latNormalized < 0.75) {
//       // Mid-northern regions - wavy hair
//       primaryType = 'wavy';
//     } else {
//       // Northern regions - straighter hair
//       primaryType = 'straight';
//     }
    
//     // Use longitude to determine the secondary hair type
//     // We'll create a gradient effect as we move east/west
//     if (longNormalized < 0.25) {
//       secondaryType = 'coily';
//     } else if (longNormalized < 0.5) {
//       secondaryType = 'curly';
//     } else if (longNormalized < 0.75) {
//       secondaryType = 'wavy';
//     } else {
//       secondaryType = 'straight';
//     }

//       // Make sure secondary type is different from primary type
//     if (secondaryType === primaryType) {
//         // Get the next type in a cyclic manner
//         const hairTypes = ['straight', 'wavy', 'curly', 'coily'];
//         const currentIndex = hairTypes.indexOf(primaryType);
//         // Get the next type in the array (cycle back to beginning if needed)
//         const nextIndex = (currentIndex + 1) % hairTypes.length;
//         secondaryType = hairTypes[nextIndex];
//     }

//     return {
//       primary: primaryType,
//       secondary: secondaryType,
//     //   interpValue: interpValue
//     };
//   }
  
//   // Modify your existing code to use location data
//   let userLatitude, userLongitude;
//   let hairTypesForLocation = getHairTypesByLocation(weatherData.lat, weatherData.lon);

  
//   // Modified draw function that uses location-based hair types
//   function draw() {
//       noStroke();
//       clear();
//       // background(0);
//       fill("deeppink");
//       textAlign(CENTER, CENTER);
//       textFont(font);
//       textSize(280);
//       text('INFRINGE', windowWidth/2, windowHeight/2.5);
  
//       textFont(bodyFont);
//       textSize(50);
//       text('Anthropology of Hair', windowWidth/2, windowHeight/2.5 + 180);
  
//       const w = weight.value();
//       const w2 = weight2.value();
  
//       // Use location-based interpolation value if available, otherwise fall back to slider
//       let t;
//       if (hairTypesForLocation) {
//           // Override the slider with location-based interpolation
//           t = hairTypesForLocation.interpValue;
//           // Optionally update the slider to match (visual feedback)
//           slider.value(t);
//       } else {
//           const hairSlider = slider.value();
//           t = hairMap(hairSlider);
//       }
  
//       const waveIntensity = map(weatherData.wind, 0, 100, 0, 150);
//       const noiseIntensity = map(weatherData.wind, 0, 100, 0, 100);
  
//       //draw each shape twice so theres two strokes - one shape with larger stroke 
//       //outer stroke
//       noFill();
//       strokeWeight(w2);  
//       stroke('rgb(255,255,255)');  
      
//       //letter spacing + positioning
//       const letterSpacings = [95, 200, 170, 190, 85, 200, 205, 100];
//       const totalWidth = letterSpacings.reduce((sum, space) => sum + space, 0);
//       const startX = (windowWidth / 2) - (totalWidth / 2) - 35;
//       const startY = windowHeight / 3.3;
//       let xOffset = startX;
      
//       //drawing each letter w outer stroke
//       letters.forEach((letter, index) => {
//           push();
//           translate(xOffset, startY);
          
//           // Get the correct hair types based on location
//           let hairType1, hairType2;
//           if (hairTypesForLocation) {
//               hairType1 = letter[hairTypesForLocation.primary] || letter.straight;
//               hairType2 = letter[hairTypesForLocation.secondary] || letter.curly;
//           } else {
//               hairType1 = letter.straight;
//               hairType2 = letter.wavy;
//           }
          
//           drawLetter(hairType1, hairType2, t, index, waveIntensity, noiseIntensity);
//           pop();
//           xOffset += letterSpacings[index];
//       });
  
//       //inner stroke
//       xOffset = startX;
//       noFill();
//       strokeWeight(w);
//       stroke('rgba(0, 0, 0, 0.9)');
      
//       //drawing each letter w inner stroke
//       letters.forEach((letter, index) => {
//           push();
//           translate(xOffset, startY);
          
//           // Get the correct hair types based on location
//           let hairType1, hairType2;
//           if (hairTypesForLocation) {
//               hairType1 = letter[hairTypesForLocation.primary] || letter.straight;
//               hairType2 = letter[hairTypesForLocation.secondary] || letter.curly;
//           } else {
//               hairType1 = letter.straight;
//               hairType2 = letter.wavy;
//           }
          
//           drawLetter(hairType1, hairType2, t, index, waveIntensity, noiseIntensity);
//           pop();
//           xOffset += letterSpacings[index];
//       });
      
//       // Display location info on the canvas if available
//       if (hairTypesForLocation) {
//           fill(255);
//           textSize(18);
//           textAlign(LEFT, BOTTOM);
//           text(`Location: ${userLatitude.toFixed(1)}°, ${userLongitude.toFixed(1)}°`, 20, windowHeight - 60);
//           text(`Hair blend: ${hairTypesForLocation.primary} + ${hairTypesForLocation.secondary}`, 20, windowHeight - 40);
//           text(`Blend ratio: ${(hairTypesForLocation.interpValue * 100).toFixed(0)}%`, 20, windowHeight - 20);
//       }
//   }
