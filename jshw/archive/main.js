function changepages(pageNumber) {
    //api limits to 100 images per request; setting page number as a variable to add a randomize image feature later
    const url = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=100`;

    fetch(url)
        .then(response => response.json())
        // .then(resp => console.log(resp))
        .then((resp) => {
            console.log(resp);
            const imgContainer = document.getElementById("images");
            imgContainer.innerHTML = ""; //remove previous images when page is randomized

            resp.data.forEach(artwork =>{
                //creating image element
                const art = document.createElement("img");

                //creating iiif URL for each image
                const baseUrl = resp.config.iiif_url;
                const imageId = artwork.image_id;
                const iiifUrl = `${baseUrl}/${imageId}/full/,150/0/default.jpg`;

                //getting info for each artwork;
                const artistname = artwork.artist_display;
                const artdate = artwork.title;
                const artmedium = artwork.medium_display;
                const artlocation = artwork.place_of_origin;


                // Function to remove the existing popup div when another img is clicked
                function removePopup() {
                    const onscreen = document.querySelector('.popup-div');
                    if (onscreen) {
                        document.body.removeChild(onscreen);
                    }
                }

                //dispalying info in a popup when each img is clicked
                function infoPopup() {
                    //calling functioln to clear previous div
                    removePopup()

                    //creating elements and linking the css to them
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
                        <span class="bold">Location:</span> ${artlocation}
                        </div>
                    `;

                    //duplicate image so it stays in the container
                    const clonedArt = art.cloneNode(true);
                    clonedArt.classList.add('cloned-art');


                    //appending all elements to the div
                    popupdiv.appendChild(clonedArt);
                    popupdiv.appendChild(textDiv);
                    popupdiv.appendChild(exitbtn);
                
                    //remove the popup div when the exit button is clicked
                    exitbtn.addEventListener('click', function() {
                        document.body.removeChild(popupdiv);
                    });
                
                    //append div to the body
                    document.body.appendChild(popupdiv);
                }
                art.addEventListener('click', infoPopup);



                //appending  image element to image container
                art.src = iiifUrl;     
                imgContainer.appendChild(art);

                // art.addEventListener('click', toggleBlur);
                // function toggleBlur() {
                // this.classList.toggle('blur');
                // }



            });
        })
        .catch(error => console.error("error", error));
}

//select a random page number from 1 through 9398
function randomizePage() {
    const newnum = Math.floor(Math.random() * 500);
    changepages(newnum);
    console.log(newnum);
}

const btn = document.getElementById("rand");
btn.addEventListener("click", randomizePage);

// set default page as 50
const defaultnum = 500;
changepages(defaultnum);


let blur = document.getElementById("blur");
let size = document.getElementById("size");
let contrast = document.getElementById("contrast");
let invert = document.getElementById("invert");
let saturation = document.getElementById("saturation");

const imgContainer = document.getElementById("images");

//setting image values in an array to prevent overriding
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
    blur.value = 0;
    size.value = 150;
    contrast.value = 100;
    invert.value = 0;
    saturation.value = 150;

    filters.blur = blur.value;
    filters.size = size.value;
    filters.contrast = contrast.value;
    filters.invert = invert.value;
    filters.saturation = saturation.value;

    let images = imgContainer.querySelectorAll('img');
    images.forEach(function(img) {
        img.style.filter =  "blur(" + filters.blur + "px) " +
                            "contrast(" + filters.contrast + "%) " +
                            "invert(" + filters.invert + "%) " +
                            "saturate(" + filters.saturation + "%)";
        img.style.height = filters.size + "px";
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