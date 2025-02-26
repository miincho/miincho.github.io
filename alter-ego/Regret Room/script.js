const fadeOutContent = document.getElementById('fadeOutContent');
fadeOutContent.addEventListener('click', () => {
    fadeOutContent.classList.add('fade-out');
});

/*white spheres*/

  // Function to handle choice clicks and navigate to the next page
  function handleChoiceClickAndNavigate3(choiceId, nextPage) {
    // Store the clicked choice ID in local storage
    localStorage.setItem('clickedChoice3', choiceId);

    // Navigate to the next page
    window.location.href = nextPage;
  }


  // Attach click event listeners to your choices

  document.getElementById('firstChoice').addEventListener('click', function() {
    handleChoiceClickAndNavigate3('firstChoice', '../OUTPUT/output.html');
  });

  document.getElementById('secondChoice').addEventListener('click', function() {
    handleChoiceClickAndNavigate3('secondChoice', '../OUTPUT/output.html');
  });

  document.getElementById('thirdChoice').addEventListener('click', function() {
    handleChoiceClickAndNavigate3('thirdChoice', '../OUTPUT/output.html');
  });



  const firstCheck = document.getElementById('firstCheck');
  const firstCheckYes = document.getElementById('firstCheckYes');
  const clickSphere = document.getElementById('sphere1');
  const camera = document.querySelector('a-camera');
  
  clickSphere.addEventListener('click', () => {
      firstCheck.style.transform = 'scale(1)';
  });
  
  firstCheck.addEventListener('click', (event) => {
      if (event.target.classList.contains('no1')) {
          firstCheck.style.display = 'none';
          firstCheckYes.style.transform = 'scale(0)';
      }
  
      if (event.target.classList.contains('yes1')) {
          firstCheck.style.display = 'none';
          firstCheckYes.style.transform = 'scale(1)';
      }
  });
  
  const secondCheck = document.getElementById('secondCheck');
  const secondCheckYes = document.getElementById('secondCheckYes');
  const clickSphere2 = document.getElementById('sphere2');
  const camera2 = document.querySelector('a-camera');
  
  clickSphere2.addEventListener('click', () => {
      secondCheck.style.transform = 'scale(1)';
  });
  
  secondCheck.addEventListener('click', (event) => {
      if (event.target.classList.contains('no1')) {
          secondCheck.style.display = 'none';
          secondCheckYes.style.transform = 'scale(0)';
      }
  
      if (event.target.classList.contains('yes1')) {
          secondCheck.style.display = 'none';
          secondCheckYes.style.transform = 'scale(1)';
      }
  });
  

  const thirdCheck = document.getElementById('thirdCheck');
  const thirdCheckYes = document.getElementById('thirdCheckYes');
  const clickSphere3 = document.getElementById('sphere3');
  const camera3 = document.querySelector('a-camera');
  
  clickSphere3.addEventListener('click', () => {
      thirdCheck.style.transform = 'scale(1)';
  });
  
  thirdCheck.addEventListener('click', (event) => {
      if (event.target.classList.contains('no1')) {
          thirdCheck.style.display = 'none';
          thirdCheckYes.style.transform = 'scale(0)';
      }
  
      if (event.target.classList.contains('yes1')) {
          thirdCheck.style.display = 'none';
          thirdCheckYes.style.transform = 'scale(1)';
      }
  });











/*EMOTION TOGGLE*/
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
