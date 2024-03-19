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

// /*room value*/
//   // Function to retrieve and log the clicked choice ID
//   function logClickedChoice() {
//     // Retrieve the clicked choice ID from local storage
//     var clickedChoice = localStorage.getItem('clickedChoice1');

//     // Log the clicked choice ID to the console
//     console.log('Clicked Choice ID 1:', clickedChoice);

//     // Optional: Clear the local storage after logging
//     localStorage.removeItem('clickedChoice1');
//   }

//   // Call the function when the window has finished loading
//   window.addEventListener('load', logClickedChoice);

  

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
const first = document.querySelector('.sections_title.one');
const  second = document.querySelector('.sections_title.two');
const third = document.querySelector('.sections_title.three');
const fourth = document.querySelector('.sections_title.four');


const firstContent = document.querySelector('.content1');
const secondContent = document.querySelector('.content2');
const thirdContent = document.querySelector('.content3');
const fourthContent = document.querySelector('.content4');

document.getElementById('plus1').classList.add('rotate');

first.addEventListener('click', () => {
  fourthContent.style.display = "none";
  thirdContent.style.display = "none";
  secondContent.style.display = "none";
  firstContent.style.display = "block";

  document.getElementById('plus1').classList.add('rotate');
  document.getElementById('plus2').classList.remove('rotate');
  document.getElementById('plus3').classList.remove('rotate');
  document.getElementById('plus4').classList.remove('rotate');
});

second.addEventListener('click', () => {
  fourthContent.style.display = "none";
  thirdContent.style.display = "none";
  firstContent.style.display = "none";
  secondContent.style.display = "block";

  document.getElementById('plus1').classList.remove('rotate');
  document.getElementById('plus2').classList.add('rotate');
  document.getElementById('plus3').classList.remove('rotate');
  document.getElementById('plus4').classList.remove('rotate');
});

third.addEventListener('click', () => {
  secondContent.style.display = "none";
  thirdContent.style.display = "block";
  firstContent.style.display = "none";
  fourthContent.style.display = "none";

  document.getElementById('plus1').classList.remove('rotate');
  document.getElementById('plus2').classList.remove('rotate');
  document.getElementById('plus3').classList.add('rotate');
  document.getElementById('plus4').classList.remove('rotate');
});

fourth.addEventListener('click', () => {
  secondContent.style.display = "none";
  thirdContent.style.display = "none";
  firstContent.style.display = "none";
  fourthContent.style.display = "block";

  document.getElementById('plus1').classList.remove('rotate');
  document.getElementById('plus2').classList.remove('rotate');
  document.getElementById('plus3').classList.remove('rotate');
  document.getElementById('plus4').classList.add('rotate');
});




