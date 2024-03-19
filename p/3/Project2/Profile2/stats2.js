fetch('stats.json')
  .then(response => response.json())
  .then(data => {
    // Get the list element
    const matches = document.getElementById('contextStats').querySelector('p');
    

    // Loop through the data and add each item to the list
    data.forEach(item => {
      const p = document.createElement('p');
      const img = document.createElement('img');

      // Add the div and p elements to the list item
      div.appendChild(img);
      div.appendChild(p);


      // Filter by profile section
      const filter1stPhoto = document.querySelector('#firstPhoto');
      const filter2ndPhoto = document.querySelector('#secondPhoto');
      const filter3rdPhoto = document.querySelector('#thirdPhoto');
      const filter4thPhoto = document.querySelector('#fourthPhoto');
      const filter5thPhoto = document.querySelector('#fifthPhoto');
      const filter6thPhoto = document.querySelector('#sixthPhoto');
      const filter1stPrompt = document.querySelector('#firstPrompt');
      const filter2ndPrompt = document.querySelector('#secondPrompt');
      const filter3rdPrompt = document.querySelector('#thirdPrompt');

      // Filter photos
      filter1stPhoto.addEventListener('click', function() {
        if (item.Profile === 'Kha1') {
        p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
          p.style.display = "block";
        } else {
          p.style.display = "none";
        }
      });




      filter2ndPhoto.addEventListener('click', function() {
        if (item.Profile === 'Kha2') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      });

      filter3rdPhoto.addEventListener('click', function() {
        if (item.Profile === 'Kha3') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      });

      filter4thPhoto.addEventListener('click', function() {
        if (item.Profile === 'Kha4') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      });

      filter5thPhoto.addEventListener('click', function() {
        if (item.Profile === 'Kha5') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      });

      filter6thPhoto.addEventListener('click', function() {
        if (item.Profile === 'Kha6') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      });

      // Filter prompts
      filter1stPrompt.addEventListener('click', function() {
        if (item.Profile === 'Kha7') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      });

      filter2ndPrompt.addEventListener('click', function() {
        if (item.Profile === 'Kha8') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      });

      filter3rdPrompt.addEventListener('click', function() {
        if (item.Profile === 'Kha9') {
            p.innerHTML = item.StatAll + '<br />' + item.StatMale + '<br />' + item.StatFemale + '<br />' + item.StatNon;
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
      }); 

      matches.appendChild(div);
    });
  })
  .catch(error => console.error(error));