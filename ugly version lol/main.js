window.onload = function () {
    const helloTranslations = ['Hello!', 'Bonjour!', 'Hola!', 'Ciao!', 'Hallo!', 'Olá!', 'Hei!','Nǐ hǎo!']; // Add more translations as needed
  
    const helloText = document.getElementById('hello');
    let currentIndex = 0;
  
    function flickerHello() {
      if (currentIndex < helloTranslations.length) {
        helloText.textContent = helloTranslations[currentIndex];
        currentIndex++;
        setTimeout(flickerHello, 190); 
      } else {
        helloText.textContent = 'Hello!'; 
      }
    }
  
    flickerHello();
};



  const changeableText = document.getElementById('mink');
  const textOptions = ['a person', 'asleep', 'thinking of you', 'a designer', 'watching you','happy to meet you', 'not Minkyung', 'wishing your dream comes true', 'scared of spiders', 'not real', 'wondering who you are', `hoping you're happy :)`]; 

  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * textOptions.length);
    return textOptions[randomIndex];
  }

  function changeRandomText() {
    changeableText.textContent = getRandomText();
  }

  changeableText.addEventListener('click', changeRandomText);




document.addEventListener("DOMContentLoaded", function() {
  const circles = document.querySelectorAll('.circle');

  circles.forEach(circle => {
      circle.addEventListener('click', function() {
          const selectedColor = this.getAttribute('data-color');

          circles.forEach(otherCircle => {
              otherCircle.classList.remove('green', 'blue', 'red');
              otherCircle.classList.add(selectedColor);
          });
      });
  });
});

