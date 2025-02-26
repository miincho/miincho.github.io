fetch('matchesKyu.json')
  .then(response => response.json())
  .then(data => {
    // Get the list element
    const matches = document.getElementById('matches');
    
    //toggle css remove button "camera" icon
    const toggleFilterBtn = document.getElementById('camera');
    let isFilterOn = true;   
    toggleFilterBtn.addEventListener('click', () => {
      const images = matches.getElementsByTagName('img');
      
      for (let i = 0; i < images.length; i++) {
        if (isFilterOn) {
          images[i].style.filter = 'none';
        } else {
          images[i].style.filter = 'drop-shadow(5px 5px #21363a90) sepia(1) blur(3px) contrast(0.5)';
        }
      }   
      isFilterOn = !isFilterOn;
    });

    //refresh button
    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', () => {
      location.reload();
    });

    // Loop through the data and add each item to the list
    data.forEach(item => {
      const div = document.createElement('div');
      const p = document.createElement('p');
      const img = document.createElement('img');


    // Match and reject drag drop // disable on mobile screen size
    if ($(window).width() > 600) {
      $("#matches img").draggable();
    }
    
    $(window).on('resize', function() {
      if ($(window).width() <= 600) {
        $("#matches img").draggable("disable");
      } else {
        $("#matches img").draggable();
      }
    });
    
    $("#reject").droppable({
      drop: function(event, ui) {
        ui.draggable.remove();
        $("#matches p").css("display", "none");
      }
    });
    


      // Text appear on hover
      img.addEventListener("mouseenter", () => {
        p.innerHTML = item.Name + '<br />' + item.Age + '<br />' + item.Gender + '<br />' + item.Comments;
        p.style.display = "block";
        p.style.backgroundColor = '#d9c58b';
        p.style.color = 'black';
        p.style.position = 'absolute';
        p.style.zIndex = '500';
        p.style.padding = '10px';
        p.style.maxWidth = '120px';
        p.style.marginTop = '40px';
        p.style.marginLeft = '15px';
      });
      

      
      // Hide text when mouse leaves the image
      img.addEventListener("mouseleave", () => {
        p.style.display = "none";
      });

      // Profile info appear on click
      img.addEventListener("click", () => {
        p.textContent = item.Profile;
        p.style.display = "block"
      });

         // mobile stuff
    img.addEventListener("touchstart",() => {
      p.innerHTML = item.Profile;
      p.style.display = "block";
      p.style.backgroundColor = '#d9c58b';
      p.style.color = 'black';
      p.style.position = 'absolute';
      p.style.zIndex = '500';
      p.style.padding = '10px';
      p.style.maxWidth = '120px';
      p.style.marginTop = '40px';
      p.style.marginLeft = '15px';
    });

    // Hide text when touch ends
    img.addEventListener("touchend", () => {
      p.style.display = "none";
    });

    

      // Set the src attribute for the image
      img.src = "imgs/" + item.Headshot;
      img.style.display = "none";
      p.style.display= "none";

      // Add the div and p elements to the list item
      div.appendChild(img);
      div.appendChild(p);

      // Filter by gender
      const filterMan = document.querySelector('#manBtn');
      const filterAll = document.querySelector('#allBtn');
      const filterWoman = document.querySelector('#womanBtn');
      const filterOther = document.querySelector('#otherBtn');

            //lower opacity on click
            let prevBtn = allBtn; 

            allBtn.addEventListener("click", () => {
              prevBtn.style.opacity = 1; 
              allBtn.style.opacity = 0.5;
              prevBtn = allBtn; 
            });
            
            manBtn.addEventListener("click", () => {
              prevBtn.style.opacity = 1; 
              manBtn.style.opacity = 0.5;
              prevBtn = manBtn; 
            });
            
            womanBtn.addEventListener("click", () => {
              prevBtn.style.opacity = 1; 
              womanBtn.style.opacity = 0.5;
              prevBtn = womanBtn; 
            });
            
            otherBtn.addEventListener("click", () => {
              prevBtn.style.opacity = 1; 
              otherBtn.style.opacity = 0.5;
              prevBtn = otherBtn; 
            });
            
            //make text white on click
            const sections = document.querySelectorAll(".sections");
            let prevSection = sections[0]; // initialize previous section to the first section
            
            sections.forEach((section) => {
              section.addEventListener("click", () => {
                prevSection.style.color = "black"; 
                section.style.color = "white";
                prevSection = section; 
              });
            });

      filterAll.addEventListener('click', function() {
        div.style.display = "block";
      });

      filterMan.addEventListener('click', function() {
        if (item.Gender == 'Man') {
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      });

      filterWoman.addEventListener('click', function() {
        if (item.Gender == 'Woman') {
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      });

      filterOther.addEventListener('click', function() {
        if (item.Gender != 'Man' && item.Gender != 'Woman') {
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      });

      

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

      if (item.Liked === '1st Photo') {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
  
  

      // Filter photos
      filter1stPhoto.addEventListener('click', function() {
        if (item.Liked === '1st Photo') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      filter2ndPhoto.addEventListener('click', function() {
        if (item.Liked === '2nd Photo') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      filter3rdPhoto.addEventListener('click', function() {
        if (item.Liked === '3rd Photo') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      filter4thPhoto.addEventListener('click', function() {
        if (item.Liked === '4th Photo') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      filter5thPhoto.addEventListener('click', function() {
        if (item.Liked === '5th Photo') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      filter6thPhoto.addEventListener('click', function() {
        if (item.Liked === '6th Photo') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      // Filter prompts
      filter1stPrompt.addEventListener('click', function() {
        if (item.Liked === '1st Prompt') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      filter2ndPrompt.addEventListener('click', function() {
        if (item.Liked === '2nd Prompt') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

      filter3rdPrompt.addEventListener('click', function() {
        if (item.Liked === '3rd Prompt') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      }); 

      matches.appendChild(div);
    });
  })
  .catch(error => console.error(error));