const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)




/*grab color*/
let previousEmotion = null;
let previousEmotionColor = null;

document.querySelectorAll('.emotionButton').forEach(div => {
  div.addEventListener('click', () => {
    const color = div.dataset.color;
    const emotionId = div.id;

    // Reset the previous emotion style
    if (previousEmotion) {
      previousEmotion.style.borderColor = ''; // or set it to the default color
      previousEmotionColor.style.color = '';
    }

    // Apply style to the clicked emotion
    div.style.borderColor = color;
    div.style.color = color;
    localStorage.setItem("emotionId", emotionId); // Store the emotion ID
    localStorage.setItem("emotionColor", color); // Store the emotion color

    // Update the previousEmotion variable
    previousEmotion = div;
    previousEmotionColor = div;

    window.location.href = "../intro/intro.html";
  });
});


console.log(localStorage.getItem("emotionId"));
console.log(localStorage.getItem("emotionColor"));

