/*    //window load PLEASE WORKW[PLEASEWORK]
    function clickFirstPhotoButton() {
      var filter1stPhoto = document.querySelector('#firstPhoto');
      
      // Trigger a click event on the button
      try {
        filter1stPhoto.click();
        console.log('Button clicked');
      } catch (error) {
        console.error(error);
      }
    }
    document.addEventListener("DOMContentLoaded", function() {
      clickFirstPhotoButton();
    });

    window.addEventListener('load', function() {
      clickFirstPhotoButton();
    });
*/


fetch('matchesKhari.json')
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
    
    
    
    

    /*// Drop event listener
    $("#reject").droppable({
      accept: "#matches img",
      drop: function(event, ui) {
        ui.draggable.addClass("rejected");
      }
    });*/


    // Text appear on hover
    img.addEventListener("mouseenter",() => {
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
    
    //mobile version
    img.addEventListener("touchstart", () => {
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

    //Profile info appear on click mobile version
    img.addEventListener("dblclick", () => {
      p.textContent = item.Profile;
      p.style.display = "block";
    });

    // Set the src attribute for the image
    img.src = "imgs/" + item.Headshot;

    // Add the div and p elements to the list item
    div.appendChild(img);
    div.appendChild(p);

    // Filter by gender
    const filterMan = document.querySelector('#manBtn');
    const filterAll = document.querySelector('#allBtn');
    const filterWoman = document.querySelector('#womanBtn');
    const filterOther = document.querySelector('#otherBtn');

          //lower button opacity on click
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



/*
    function clickFirstPhotoButton() {
      var filter1stPhoto = document.querySelector('#firstPhoto');
      
      // Trigger a click event on the button
      try {
        filter1stPhoto.click();
        console.log('Button clicked');
      } catch (error) {
        console.error(error);
      }
    }
    document.addEventListener("DOMContentLoaded", function() {
      clickFirstPhotoButton();
    });

    window.addEventListener('load', function() {
      clickFirstPhotoButton();

    });*/

    /*
    document.addEventListener("DOMContentLoaded", function() {
      // Get a reference to the button element
      var filter1stPhoto = document.querySelector('#firstPhoto');
      
      // Trigger a click event on the button
      try {
        filter1stPhoto.click();
        console.log('Button clicked');
      } catch (error) {
        console.error(error);
      }
    });*/


   /*window.addEventListener('load', function() {
      if (item.Liked === '1st Photo') {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });*/




    // Filter photos
    window.addEventListener('load', function() {
      const filter1stPhoto = document.querySelector('#filter1stPhoto');
    
      // Define your filterItems function here
      function filterItems() {
        // ...
        if (item.Liked === '1st Photo') {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      }
    
    
      // Add the click event listener to the button to trigger the filtering
      filter1stPhoto.addEventListener('click', filterItems);
    
      // Trigger the click event of the button when the page first loads in
      filter1stPhoto.click();
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



      

      // Filter Profile image and stat info
      window.addEventListener('load', function() {
        const filter1stPhoto = document.querySelector('#filter1stPhoto');
      
        // Define your filterItems function here
        function filterItems() {
          // ...
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
        }
      
      
        // Add the click event listener to the button to trigger the filtering
        filter1stPhoto.addEventListener('click', filterItems);
      
        // Trigger the click event of the button when the page first loads in
        filter1stPhoto.click();
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

/*------------------
  document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the button element
    var filter1stPhoto = document.querySelector('#firstPhoto');

    // Trigger a click event on the button
    try {
      filter1stPhoto.click();
      console.log('Button clicked');
    } catch (error) {
      console.error(error);
    }
  }); 
  
  window.addEventListener("load", function() {
    // Get a reference to the button element
    var filter1stPhoto = document.querySelector('#firstPhoto');
    
    // Trigger a click event on the button
    try {
      filter1stPhoto.click();
      console.log('Button clicked');
    } catch (error) {
      console.error(error);
    }
  });
  
*/

//


 

