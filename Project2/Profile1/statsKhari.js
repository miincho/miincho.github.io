fetch('statsKhari.json')
  .then(response => response.json())
  .then(data => {
    // Get the list element
    const images = document.getElementById('captionImage');
    const stats = document.getElementById('contextStats').querySelector('p');
    

    // Loop through the data and add each item to the list
    data.forEach(item => {
      const div = document.createElement('div');
      const p = document.createElement('p');
      const img = document.createElement('img');


      /*
   //load one section at first
    window.addEventListener('load', function() {
    // Get all the profile sections
    //var profileSections = document.querySelectorAll('captionImage');

    // Hide all profile sections except the first one
    if (item.Profile != 'Khari1') {
     img.style.display = "block";

    } else {
        img.style.display = "none";
    }
});
*/

      // Set the src attribute for the image
      img.src = "profileimgs/" + item.Image;
      img.style.display = "none";
      p.style.display = "none";

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

/*
      window.addEventListener('load', function() {
        // Get a reference to the button element
        var filter1stPhoto = document.querySelector('#firstPhoto');
    
        // Trigger a click event on the button
        filter1stPhoto.click();
      });*/
      
      /*
      window.addEventListener('load', function() {
        // Hide all images and stat info except for filter1stPhoto
        if (item.Image === '1stPhoto.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }

        if (item.Profile === 'Khari1') {
          p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
            p.style.width = "210px";
            p.style.display = "flex";
            p.style.alignItems = "center";
            p.style.justifyContent = "center";
      } else {
            p.style.display = "none";
      }

      });*/


      if (item.Image === '1stPhoto.png') {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }

      if (item.Profile === 'Khari1') {
        p.style.display = "block";
        p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
          p.style.width = "210px";
          p.style.display = "flex";
          p.style.alignItems = "center";
          p.style.justifyContent = "center";

      } else {
          p.style.display = "none";
      }
      

      // Filter Profile image and stat info
      filter1stPhoto.addEventListener('click', function() {
        if (item.Image === '1stPhoto.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }

        if (item.Profile === 'Khari1') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      });

      filter2ndPhoto.addEventListener('click', function() {
        if (item.Image === '2ndPhoto.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }

        if (item.Profile === 'Khari2') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }

      });

      filter3rdPhoto.addEventListener('click', function() {
        if (item.Image === '3rdPhoto.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }

        if (item.Profile === 'Khari3') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      });

      filter4thPhoto.addEventListener('click', function() {
        if (item.Image === '4thPhoto.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }

        if (item.Profile === 'Khari4') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      });

      filter5thPhoto.addEventListener('click', function() {
        if (item.Image === '5thPhoto.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }

        if (item.Profile === 'Khari5') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      });

      filter6thPhoto.addEventListener('click', function() {
        if (item.Image === '6thPhoto.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
        if (item.Profile === 'Khari6') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      });

      // Filter prompts
      filter1stPrompt.addEventListener('click', function() {
        if (item.Image === '1stPrompt.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
        if (item.Profile === 'Khari7') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      });

      filter2ndPrompt.addEventListener('click', function() {
        if (item.Image === '2ndPrompt.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
        if (item.Profile === 'Khari8') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      });

      filter3rdPrompt.addEventListener('click', function() {
        if (item.Image === '3rdPrompt.png') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
        if (item.Profile === 'Khari9') {
            p.innerHTML = item.StatAll + '<br />' + '<br />' + item.StatMale + '<br />' + '<br />' + item.StatFemale + '<br />' + '<br />' + item.StatNon;
              p.style.width = "210px";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
        } else {
              p.style.display = "none";
        }
      }); 

      images.appendChild(img);
      stats.appendChild(p);
    });
  })
  .catch(error => console.error(error));