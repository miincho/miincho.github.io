/*user name*/
document.addEventListener("DOMContentLoaded", function() {
const storedName = localStorage.getItem("name");



if (storedName) {
    console.log("Retrieved Name:", storedName);
    const text1Div = document.querySelector('.text1');
    text1Div.textContent = `${storedName}'S ALTER EGO`;
} 



var clickedChoice3 = localStorage.getItem('clickedChoice3');
var clickedChoice2 = localStorage.getItem('clickedChoice2');
var clickedChoice1 = localStorage.getItem('clickedChoice1');

console.log('Clicked Choice3:', clickedChoice3);
console.log('Clicked Choice2:', clickedChoice2);
console.log('Clicked Choice1:', clickedChoice1);

/*character gen imgs*/
window.onload = function() {
  const storedShape1 = localStorage.getItem("clickedChoice1");
  const storedShape2 = localStorage.getItem("clickedChoice2");
  const storedShape3 = localStorage.getItem("clickedChoice3");

  const headImageOptions = {
    "secondChoice": {
      backgroundImage: "url('character/head/head_angel.png')",
      name: "ethereal",
      description: "Head: Your presence is otherworldly, carrying an ethereal grace that sets you apart. You navigate life with a sense of divine beauty and a connection to the intangible."
    },
    "thirdChoice": {
      backgroundImage: "url('character/head/head_tv.png')",
      name: "static",
      description: " Head: Your life unfolds in a constant stream of varied experiences and influences. This dynamic perspective may contribute to adaptability. The static nature might lead to a resistance to change, potentially hindering personal and professional growth."
    },
    "fourthChoice": {
      backgroundImage: "url('character/head/head_bignose.png')",
      name: "smelly",
      description: "Head: With a keen sense of smell, you have a heightened appreciation for the nuanced scents around you. It brings a unique perspective, though it can also make you sensitive to odors that others might not notice."
    },
    "fifthChoice": {
      backgroundImage: "url('character/head/head_crashdummy.png')",
      name: "broken",
      description: "Head: Life's collisions have left marks of strength, but acknowledging vulnerabilities is essential. Embracing imperfections can lead to a more authentic and empathetic connection with others."
    },
    "sixthChoice":{
      backgroundImage: "url('character/head/head_heart.png')",
      name: "sentimental ",
      description: "Head: Emotions course through you like a sentimental melody. Your heart guides your actions, and you navigate life with a deep connection to your feelings and those of others."
    },
  };

  const torsoImageOptions = {
    "firstChoice": {
      backgroundImage: "url('character/torso/torso_baby.png')",
      name: "The Mother's",
      description: "Torso: You carry a nurturing essence within, embodying the spirit of a caregiver. Your tendencies gravitate towards protection, warmth, and the instinct to provide solace to those around you."
    },
    "secondChoice":{
      backgroundImage: "url('character/torso/torso_centipede.png')",
      name: "The Insect's",
      description: "Torso: Your connections are myriad, weaving through the tapestry of your life. You exhibit adaptability, resilience, and the ability to thrive in diverse environments, much like the intricate legs of a centipede."
    },
    "thirdChoice":{
      backgroundImage: "url('character/torso/torso_crashdummy.png')",
      name: "The Survivor's",
      description: "Torso: Life's collisions have molded you into a resilient soul. Your experiences, though impactful, have forged strength and an ability to endure. You navigate challenges with a survivor's spirit."
    },
    "fourthChoice":{
      backgroundImage: "url('character/torso/torso_intestines.png')",
      name: "The Doctor's",
      description: "Torso: Your understanding of the intricacies of life is akin to a skilled physician. You delve into the depths, seeking knowledge and insight. Your analytical nature allows you to diagnose and understand the complexities of existence."
    },
  };

  const legImageOptions = {
    "firstChoice":{
      backgroundImage: "url('character/leg/leg_frog.png')",
      name: "rebirther",
      description: "Leg: Your adaptability and resilience are akin to the transformative nature of a rebirther. You navigate life's changes with grace, embracing growth and renewal. The constant cycle of change may occasionally lead to a fear of stagnation. Recognizing the value of stability while welcoming growth is important."
    },
    "secondChoice":{
      backgroundImage: "url('character/leg/leg_mannequin.png')",
      name: "faker",
      description: "Leg: Your ability to adapt and play different roles, like a faker, makes you versatile in various situations. You navigate social dynamics with ease. The constant adaptation may sometimes lead to a sense of identity confusion. Ensuring authenticity and maintaining a sense of self is crucial."
    },
    "thirdChoice":{
      backgroundImage: "url('character/leg/leg_chicken.png')",
      name: "fertilizer",
      description: "Leg: Your ability to nurture and enhance growth is akin to fertilizer. You contribute to the development of ideas and relationships, fostering a thriving environment. The role of a fertilizer may lead to neglecting personal boundaries. It's crucial to ensure your contributions are reciprocated and valued."
    },
    "fourthChoice":{
      backgroundImage: "url('character/leg/leg_fish.png')",
      name: "lucky dinner",
      description: "Leg: Your presence is associated with good fortune, and people feel fortunate to have you around. Your positive energy brings luck and joy to various situations. Relying on luck may sometimes lead to a lack of proactive decision-making. Striking a balance between spontaneity and intentionality is key."
    },
  };

  // Check if the stored choices are valid
  if (storedShape1 && storedShape2 && storedShape3) {
    const imageContainer = document.querySelector(".finalImage.accentborder");
    const headImage = imageContainer.querySelector(".head");
    const torsoImage = imageContainer.querySelector(".torso");
    const legImage = imageContainer.querySelector(".leg");
  
    console.log("Image Container:", imageContainer); 
    console.log("Head Image:", headImage);
    console.log("Torso Image:", torsoImage);
    console.log("Leg Image:", legImage);

    const headOption = headImageOptions[storedShape1];
    const torsoOption = torsoImageOptions[storedShape2];
    const legOption = legImageOptions[storedShape3];


    // Set images based on the stored choices
    headImage.style.backgroundImage = headOption.backgroundImage;
    torsoImage.style.backgroundImage = torsoOption.backgroundImage;
    legImage.style.backgroundImage = legOption.backgroundImage;

    document.querySelector(".headDesc").innerText = headOption.description;
    document.querySelector(".torsoDesc").innerText = torsoOption.description;
    document.querySelector(".legDesc").innerText = legOption.description;
    document.querySelector(".text2").innerText = torsoOption.name + " " + headOption.name + "  " + legOption.name;
  

    console.log("Setting headImage.src to:", headImageOptions[storedShape1]);
    headImage.src = headImageOptions[storedShape1];

    console.log("Setting torsoImage.src to:", torsoImageOptions[storedShape2]);
    torsoImage.src = torsoImageOptions[storedShape2];

    console.log("Setting legImage.src to:", legImageOptions[storedShape3]);
    legImage.src = legImageOptions[storedShape3];
  }
};
});

  
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

