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

  // Function to retrieve and log the clicked choice ID
  function logClickedChoice() {
    // Retrieve the clicked choice ID from local storage
    var clickedChoice = localStorage.getItem('clickedChoice2');

    // Log the clicked choice ID to the console
    console.log('Clicked Choice ID 2:', clickedChoice);

    // Optional: Clear the local storage after logging
    localStorage.removeItem('clickedChoice2');
  }

  // Call the function when the window has finished loading
  window.addEventListener('load', logClickedChoice);


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




/*rabdom font selector*/
const elements = document.querySelectorAll('.randomFont');

function getRandomFontFamily() {
  const fontFamilies = ['Montreal_Med', 'Editorial_Ult', 'Redaction50_It', 'ABC_Medium', 'Editorial_Ult_It', 'Montreal_Reg_It'];
  const randomIndex = Math.floor(Math.random() * fontFamilies.length);
  return fontFamilies[randomIndex];
}

function getRandomRotation() {
  return Math.random() * (15 + 15) - 15;
}

function getRandomFontSize() {
  const minFontSize = 1; // Set your minimum font size
  const maxFontSize = 1.3; // Set your maximum font size
  return Math.floor(Math.random() * (maxFontSize - minFontSize + 1)) + minFontSize;
}

function rotateCharacters(element) {
  const originalText = element.textContent;
  const rotatedText = originalText
    .split('')
    .map(char => (char === ' ' ? char : `<span style="display: inline-block; transform: rotate(${getRandomRotation()}deg);">${char}</span>`))
    .join('');

  element.innerHTML = rotatedText;
}

function addRandomPadding(element) {
  const originalText = element.textContent;

  // Function to get random padding value
  const getRandomPadding = () => Math.floor(Math.random() * 5) + 1; // Adjust the range as needed

  // Split the text into an array of characters
  const paddedText = originalText.split('').map(char => {
    // Apply random padding between characters
    const padding = getRandomPadding();
    return char === ' ' ? char : `<span style="display: inline-block; padding-right: ${padding}px;">${char}</span>`;
  }).join('');

  element.innerHTML = paddedText;
}

elements.forEach(element => {
  const randomFontFamily = getRandomFontFamily();
  const randomFontSize = getRandomFontSize();

  element.style.fontFamily = randomFontFamily;
  element.style.fontSize = `${randomFontSize}em`;

  if (element.classList.contains('randomFont')) {
    addRandomPadding(element);
  }
});

