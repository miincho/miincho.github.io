/*gsap.from(".progress_bar",{
 scrollTrigger:{
    trigger:".pn1",
    scrub:true,
    start: "top top",
    end: 1000
 },
 scaleX:0,
 transformOrigin: "left center",
 ease: "none"

})*/

/*text flicker*/
// const hoverLetters = "abcdefghijklmnopqrstuvwxyz";
// let interval = null;

// document.querySelectorAll(".glitch").forEach(element => {
//   element.addEventListener("mouseover", event => {
//     let iteration = 0;

//     clearInterval(interval);

//     interval = setInterval(() => {
//       event.target.innerText = event.target.innerText
//         .split("")
//         .map((_, index) => {
//           if (index < iteration) {
//             return event.target.dataset.value[index];
//           }

//           return hoverLetters[Math.floor(Math.random() * 26)];
//         })
//         .join("");

//       if (iteration >= event.target.dataset.value.length) {
//         clearInterval(interval);
//       }

//       iteration += 1 / 3;
//     }, 30);
//   });
// });

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


// First section animation
const tlFirstSection = gsap.timeline();

tlFirstSection.set(".text1", { autoAlpha: 0, x: 0, y: -120 }); 
tlFirstSection.set(".text2", { autoAlpha: 0, x: -200, y: 0 }); 
tlFirstSection.set(".intro_desc, .desc_bottom_right", { autoAlpha: 0 });

tlFirstSection.to(".text1", { autoAlpha: 1, y: 0, x: 0, duration: 1.5 })
  .to(".text2", { autoAlpha: 1, x: 0, y: 0, duration: 1 })
  .to(".intro_desc", { autoAlpha: 1, y: 0, duration: 1 })
  .to(".desc_bottom_right", { autoAlpha: 1, y: 0, duration: 1 });

// Scroll-triggered animation for first section
gsap.to([".text1", ".text2", ".intro_desc", ".desc_bottom_right"], {
   autoAlpha: 0,
   duration: 2,
   scrollTrigger: {
     trigger: ".first_section", 
     start: "50% center", 
     end: "100% center", 
     scrub: true, 
     markers: false,
     from: { autoAlpha: 1 },
   }
});







// gsap.registerPlugin(TextPlugin);

// gsap.fromTo('.pixel_room_number', {
//   duration: 1,
//   text: "01-", // Starting text
//   ease: "power2.out",
// }, {
//   text: "02-", // Ending text
//   scrollTrigger: {
//     trigger: '.pixel_room_number',
//     markers: true,
//     start: 'top 90%',
//     end: '+=100',
//     toggleActions: 'play reverse play reverse', // Adjust toggle actions as needed
//   }
// });




// gsap.from('.pixel_room_number', {
//     text: { value: "02", padSpace: true },
//     duration: 1,
//     scrollTrigger: {
//         trigger: '.room_titles_container', 
//         start: 'top 180%',
//         end: "+=800%", 
//         scrub: false, 
//         ease: "power2.out",
//         toggleActions: 'play reverse play reverse',
//         pin: true,
//         pinSpacing: false, 
//         pinReparent: false,
//         // markers: true
//     }
// });

// gsap.from('.room_titles_02', {
//   text: { value: "LOVE", padSpace: true },
//   duration: 1,
//   scrollTrigger: {
//       trigger: '.room_titles_container', 
//       start: 'top 850',
//       end: "+=300%", 
//       scrub: false, 
//       ease: "power2.out",
//       toggleActions: 'play reverse play reverse',
//       pin: true,
//       pinSpacing: false, 
//       pinReparent: false,
//       markers: true
//   }
// });

/*
// GSAP timeline for fear popups
const fearPopupTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.fear_popups',
    start: 'center 90%',
    end: '+=300%', // Adjust this value based on your content height
    scrub: true,
    markers: true,
    pin: false, // Set pin to false for the container
  },
});

// Select all fear popups
const fearPopups = document.querySelectorAll('.fear_popups > div');

// Set initial opacity and position for all fear popups
gsap.set(fearPopups, { autoAlpha: 0, y: -100 });

// Iterate through each fear popup and add to the timeline
fearPopups.forEach((popup, index) => {
  fearPopupTimeline.to(popup, { autoAlpha: 1, y: 0, duration: 0.5 }, index * 0.5);
});

// Add a delay of 1 second, then fade out
fearPopupTimeline.to(fearPopups, { autoAlpha: 0, duration: 0.5, delay: 1 });
2*/


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

 
/*particles on entire viewheight*/
 function resizeCanvas() {
   const canvas = document.getElementsByClassName('particles-js-canvas')[0];

   if (canvas) {
       canvas.style.width = window.innerWidth + 'px';
       canvas.style.height = window.innerHeight + 'px';
   }
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);
 
/*descs flexbox resizer*/
 window.addEventListener('load', function() {
   adjustMarginTop();
 });
 
 window.addEventListener('resize', function() {
   adjustMarginTop();
 });
 
 function adjustMarginTop() {
   const introDesc = document.querySelector('.intro_desc');
   const descsFlexbox = document.querySelector('.descs');
 
   if (descsFlexbox.getBoundingClientRect().bottom > window.innerHeight) {
     const overflow = descsFlexbox.getBoundingClientRect().bottom - window.innerHeight;
     introDesc.style.marginTop = `-${overflow}px`;
   } else {
     introDesc.style.marginTop = 'auto';
   }
 }
 

 /*
   // disable scroll while resizing happens
   function disableScroll() {
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';
   }

   function enableScroll() {
      const body = document.querySelector('body');
      body.style.overflow = 'auto';
   }

   window.addEventListener('load', function() {
      disableScroll();
      
      setTimeout(enableScroll, 7000);
   });

*/