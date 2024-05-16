// Fetch images with the entered keyword or randomize page
function fetchImages(pageNumber, keyword = '') {
    const url = keyword !== '' 
        ? `https://api.artic.edu/api/v1/artworks/search?q=${keyword}&limit=100&fields=id,image_id,title,artist_display,medium_display,place_of_origin` //specifying fields because not all of them show up by default for some reason
        : `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=100`;

    const imgContainer = document.getElementById("images");
    imgContainer.innerHTML = ""; // Clear previous images

    fetch(url)
        .then(response => response.json())
        .then((resp) => {
            console.log(resp);
            resp.data.forEach( artwork =>{
                const art = document.createElement("img");

                //creating iiif URL for each image
                const baseUrl = resp.config.iiif_url;
                const imageId = artwork.image_id;
                const iiifUrl = `${baseUrl}/${imageId}/full/,150/0/default.jpg`;

                //getting info for each artwork
                const artistname = artwork.artist_display;
                const artdate = artwork.title;
                const artmedium = artwork.medium_display;
                const artlocation = artwork.place_of_origin;
                const title = artwork.title;

                function infoPopup() {
                    removePopup()

                    const popupdiv = document.createElement('div');
                    popupdiv.classList.add('popup-div');
                
                    const textDiv = document.createElement('div');
                    textDiv.classList.add('popup-text-div');
                
                    const exitbtn = document.createElement('div');
                    exitbtn.classList.add('exit-btn');
                    exitbtn.textContent = 'X';
                
                    popupdiv.innerHTML = `
                        <div class="popup-text-div">
                        <span class="bold">Artist:</span> ${artistname}<br><br>
                        <span class="bold">Date:</span> ${artdate}<br><br>
                        <span class="bold">Medium:</span> ${artmedium}<br><br>
                        <span class="bold">Location:</span> ${artlocation}<br><br>
                        <span class="bold">Title:</span> ${title}
                        </div>
                    `;

                    const clonedArt = art.cloneNode(true);
                    clonedArt.classList.add('cloned-art');

                    popupdiv.appendChild(clonedArt);
                    popupdiv.appendChild(textDiv);
                    popupdiv.appendChild(exitbtn);

                    document.body.appendChild(popupdiv);
                
                    exitbtn.addEventListener('click', function() {
                        document.body.removeChild(popupdiv);
                    });
                }

                function removePopup() {
                    const onscreen = document.querySelector('.popup-div');
                    if (onscreen) {
                        document.body.removeChild(onscreen);
                    }
                }

                art.addEventListener('click', infoPopup);

                art.src = iiifUrl;     
                imgContainer.appendChild(art);
            });
        })
        .catch(error => console.error("error", error));
}

// Fetch new images with the entered keyword
const searchInput = document.querySelector("#search input");

function searchByKeyword() {
    const keyword = searchInput.value.trim();
    console.log("Keyword:", keyword); 
    fetchImages(1, keyword); 
}

searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchByKeyword(); 
    }
});

//select a random page number from 1 through 500
function randomizePage() {
    const newnum = Math.floor(Math.random() * 500);
    fetchImages(newnum);
    console.log(newnum);
}

const btn = document.getElementById("rand");
btn.addEventListener("click", randomizePage);

// set default page as 500
const defaultnum = 500;
fetchImages(defaultnum);

let blur = document.getElementById("blur");
let size = document.getElementById("size");
let contrast = document.getElementById("contrast");
let invert = document.getElementById("invert");
let saturation = document.getElementById("saturation");
const imgContainer = document.getElementById("images");

//setting image values in an array to prevent overriding previous effects
var filters = {
    blur: 0,
    size: 150,
    contrast: 100,
    invert: 0,
    saturation: 100
};

function applyFilters() {
    let images = imgContainer.querySelectorAll('img');
    images.forEach(function(img) {
        img.style.filter =  "blur(" + filters.blur + "px) " +
                            "contrast(" + filters.contrast + "%) " +
                            "invert(" + filters.invert + "%) " +
                            "saturate(" + filters.saturation + "%)";
        img.style.height = filters.size + "px";
    });
}

function changeBlur() {
    filters.blur = blur.value;
    applyFilters();
}

function changeSize() {
    filters.size = size.value;
    applyFilters();
}

function changeContrast() {
    filters.contrast = contrast.value;
    applyFilters();
}

function changeInvert() {
    filters.invert = invert.value;
    applyFilters();
}

function changeSaturation() {
    filters.saturation = saturation.value;
    applyFilters();
}

//reset value button
let reset = document.getElementById('resetbtn');

reset.addEventListener('click', function(){
    let images = imgContainer.querySelectorAll('img');
    images.forEach(function(img) {
        img.style.filter =  "blur(0px) " +
                            "contrast(100%) " +
                            "invert(0%) " +
                            "saturate(150%)";
        img.style.height = "150px";
    });
});


/*gallery page*/
let gallerybtn = document.getElementById('gallerybtn');
let galleryimgs = document.getElementById('galleryimgs');

//remove images and show gallery
function showgallery(){
    if(imgContainer.style.display === 'block'){
        imgContainer.style.display = 'none';
        galleryimgs.style.display = 'block';
    }
    else{
        imgContainer.style.display = 'block';
        galleryimgs.style.display = 'none';
    }
}

gallerybtn.addEventListener('click', showgallery);





//page 266 


// function changeBlur(){
//     filters.blur = blur.value;
//     let images = imgContainer.querySelectorAll('img');
//     images.forEach(function(img){
//         img.style.filter =  "blur(" + filters.blur  + "px)";
//     })
// }

// function changeSize(){
//     filters.size = size.value;
//     let images = imgContainer.querySelectorAll('img');
//     images.forEach(function(img){
//         img.style.height = filters.size + "px";
//     })
// }

// function changeContrast(){
//     filters.contrast = contrast.value;
//     let images = imgContainer.querySelectorAll('img');
//     images.forEach(function(img){
//         img.style.filter = "contrast(" + filters.contrast + "%)";
//     })
// }

// function changeInvert(){
//     filters.invert = invert.value;
//     let images = imgContainer.querySelectorAll('img');
//     images.forEach(function(img){
//         img.style.filter = "invert(" + filters.invert + "%)";
//     })
// }

// function changeSaturation(){
//     filters.saturation = saturation.value;
//     let images = imgContainer.querySelectorAll('img');
//     images.forEach(function(img){
//         img.style.filter = "saturate(" + filters.saturation + "%)";
//     })
// }





    /*    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
    })*/