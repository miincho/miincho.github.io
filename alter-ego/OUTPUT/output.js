/*user name*/
// Retrieve the name from local storage
const storedName = localStorage.getItem("name");



// Check if the name is present in local storage
if (storedName) {
    console.log("Retrieved Name:", storedName);

    // Get the reference to the text1 div
    const text1Div = document.querySelector('.text1');

    // Add the retrieved name to the div
    text1Div.textContent = `${storedName}'S ALTER EGO`;

    // Use the retrieved name as needed
} else {
    console.log("Name not found in local storage.");
    // Handle the case where the name is not present
}


/*ROOM DATA*/// Function to retrieve and log the clicked choice ID for each room
function logClickedChoice(roomNumber) {
  // Retrieve the clicked choice ID from local storage
  var clickedChoice = localStorage.getItem('clickedChoice' + roomNumber);

  // Log the clicked choice ID to the console
  console.log('Clicked Choice ID ' + roomNumber + ':', clickedChoice);

  // Optional: Clear the local storage after logging
  localStorage.removeItem('clickedChoice' + roomNumber);
}

// Call the function for each room when the window has finished loading
window.addEventListener('load', function () {
  logClickedChoice(1); // For room 1
  logClickedChoice(2); // For room 2
  logClickedChoice(3); // For room 3
});

/*character gen imgs*/
try {
  const storedShape1 = localStorage.getItem("clickedChoice1");
  const storedShape2 = localStorage.getItem("clickedChoice2");
  const storedShape3 = localStorage.getItem("clickedChoice3");

  const headImageOptions = {
    "secondChoice": "../assets/final chaaracter assets/head/head_3dogs.png",
    "thirdChoice": "../assets/final chaaracter assets/head/head_muzzle.png",
    "fourthChoice": "../assets/final chaaracter assets/head/head_sliced.png",
    "fifthChoice": "../assets/final chaaracter assets/head/head_muzzle.png",
    "sixthChoice": "../assets/final chaaracter assets/head/head_sliced.png",
  };

  const torsoImageOptions = {
    "firstChoice": "../assets/final chaaracter assets/torso/torso_strawberry.png",
    "secondChoice": "../assets/final chaaracter assets/torso/torso_baby.png",
    "thirdChoice": "../assets/final chaaracter assets/torso/torso_crashdummy.png",
  };

  const legImageOptions = {
    "firstChoice": "../assets/final chaaracter assets/leg/leg_doll.png",
    "secondChoice": "../assets/final chaaracter assets/leg/leg_mannequin.png",
    "thirdChoice": "../assets/final chaaracter assets/leg/leg_metallic.png",
    "fourthChoice": "../assets/final chaaracter assets/leg/leg_fish.png",
  };

  // Check if the stored choices are valid
  if (storedShape1 && storedShape2 && storedShape3) {
    const imageContainer = document.querySelector(".finalImage.accentborder");
    console.log("Image Container:", imageContainer); // Add this line for debugging
    const headImage = imageContainer.querySelector(".head");
    const torsoImage = imageContainer.querySelector(".torso");
    const legImage = imageContainer.querySelector(".leg");

    console.log("Head Image:", headImage); // Add this line for debugging
    console.log("Torso Image:", torsoImage); // Add this line for debugging
    console.log("Leg Image:", legImage); // Add this line for debugging

    // Set images based on the stored choices
    headImage.src = headImageOptions[storedShape1];
    torsoImage.src = torsoImageOptions[storedShape2];
    legImage.src = legImageOptions[storedShape3];
  }
} catch (error) {
  console.error('Error in character gen imgs:', error);
}




  
/*lenis smooth scroll*/
const lenis = new Lenis()

lenis.on('scroll', (e) => {
console.log(e)
})

function raf(time) {
lenis.raf(time)
requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


// Fetch stored values from local storage
let storedEmotion = localStorage.getItem("emotionId");
let storedColor = localStorage.getItem("emotionColor");

console.log("Emotion: " + storedEmotion);
console.log("Color: " + storedColor);

// Function to update emotionId and emotionColor
function updateEmotion(emotionId, color) {
  // Deselect the previously selected div (if any)
  const previousDiv = document.getElementById(storedEmotion);
  if (previousDiv) {
    previousDiv.style.color = ''; // or set it to the default color
    previousDiv.style.borderColor = ''; // or set it to the default color
  }

  // Select the div
  const currentDiv = document.getElementById(emotionId);
  currentDiv.style.borderColor = color;
  document.getElementById("you").textContent = emotionId;
  storedEmotion = emotionId;
  localStorage.setItem("emotionId", emotionId);
  localStorage.setItem("emotionColor", color);

  // Change accent color only for the active div
  currentDiv.style.color = color;
  currentDiv.style.borderColor = color;

  // Change accent color for all elements with the "accent" class
  const elementsWithAccentClass = document.querySelectorAll('.accent');
  elementsWithAccentClass.forEach(element => {
    element.style.color = color;
    element.style.borderColor = color;
  });

  //changing only border colors
    const accentClassBorder = document.querySelectorAll('.accentborder');
    accentClassBorder.forEach(element => {
      element.style.borderColor = color;
    });

  //changing only background color
    const accentBackgroundColor = document.querySelectorAll('.accentbgcolor');
    accentBackgroundColor.forEach(element => {
      element.style.backgroundColor = color;
    });
}

// Set initial styles based on stored values
if (storedEmotion && storedColor) {
  const emotionDiv = document.getElementById(storedEmotion);
  const spanYou = document.getElementById("you");

  if (emotionDiv) {
    emotionDiv.style.borderColor = storedColor;
  }

  if (spanYou) {
    spanYou.textContent = storedEmotion;
  }

  // Change accent color only for the active div
  const activeDiv = document.getElementById(storedEmotion);
  if (activeDiv) {
    activeDiv.style.color = storedColor;
    activeDiv.style.borderColor = storedColor;
  }

  // Change accent color for all elements with the "accent" class
  const elementsWithAccentClass = document.querySelectorAll('.accent');
  elementsWithAccentClass.forEach(element => {
    element.style.color = storedColor;
    element.style.borderColor = storedColor;
  });

  //storing accent border
  const accentClassBorder = document.querySelectorAll('.accentborder');
  accentClassBorder.forEach(element => {
    element.style.borderColor = storedColor;
  });

    //storing background border
  const accentBackgroundColor = document.querySelectorAll('.accentbgcolor');
  accentBackgroundColor.forEach(element => {
    element.style.backgroundColor = storedColor;
  });
}

// Toggle div functionality
document.querySelectorAll('.emotion_selector > div').forEach(div => {
  div.addEventListener('click', () => {
    const color = div.dataset.color;
    const emotionId = div.id;

    // Update emotionId and emotionColor
    updateEmotion(emotionId, color);
  });
});


/*particles*/
/*particles*/
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 70,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "square",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 4
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.9,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 30,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#97999c",
      "opacity": 0.7,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 0.5
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

