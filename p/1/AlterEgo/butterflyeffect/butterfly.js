/*scroll fade-in*/
document.addEventListener('DOMContentLoaded', function () {
  // Get all elements with the class 'fade-in'
  const fadeElements = document.querySelectorAll('.fade-in');

  // Function to check if an element is in the viewport with an offset
  function isInViewport(element, offset = 350) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top + offset >= 0 &&
          rect.left + offset >= 0 &&
          rect.bottom - offset <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right - offset <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  // Function to handle the scroll event
  function handleScroll() {
      fadeElements.forEach((element) => {
          if (isInViewport(element)) {
              element.style.opacity = 1;
          }
      });
  }

  // Add the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Trigger the handleScroll function on page load
  handleScroll();
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



/*article texts toggle*/
const popCulture = document.querySelector('.chapter.one');
const phySystems = document.querySelector('.chapter.two');
const quanMechanics = document.querySelector('.chapter.three');

const popContent = document.querySelector('.one_content');
const phyContent = document.querySelector('.two_content');
const quanContent = document.querySelector('.three_content');

document.getElementById('plus1').classList.add('rotate');

popCulture.addEventListener('click', () => {
  phyContent.style.display = "none";
  quanContent.style.display = "none";
  popContent.style.display = "block";

  document.getElementById('plus1').classList.add('rotate');
  document.getElementById('plus2').classList.remove('rotate');
  document.getElementById('plus3').classList.remove('rotate');
});

phySystems.addEventListener('click', () => {
  popContent.style.display = "none";
  quanContent.style.display = "none";
  phyContent.style.display = "block";

  document.getElementById('plus1').classList.remove('rotate');
  document.getElementById('plus2').classList.add('rotate');
  document.getElementById('plus3').classList.remove('rotate');
});

quanMechanics.addEventListener('click', () => {
  popContent.style.display = "none";
  quanContent.style.display = "block";
  phyContent.style.display = "none";

  document.getElementById('plus1').classList.remove('rotate');
  document.getElementById('plus2').classList.remove('rotate');
  document.getElementById('plus3').classList.add('rotate');
});


/*scroll isolated inside text divs*/
window.addEventListener('wheel', handleScroll);

function handleScroll(event) {
  const contentWrappers = document.querySelectorAll('.one_content, .two_content, .three_content');
  contentWrappers.forEach((contentWrapper) => {
    contentWrapper.scrollTop += event.deltaY;
  });
  event.preventDefault();
}

window.addEventListener('wheel', handleScroll);

/*img caption show*/
function toggleCaption(number) {
  var caption = document.querySelector('.img_caption.' + number);
  caption.classList.toggle('show-caption');
}