function changepages(pageNumber) {
    const url = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=100`;

    fetch(url)
        .then(response => response.json())
        .then((resp) => {
            const imgContainer = document.getElementById("images");
            imgContainer.innerHTML = "";

            resp.data.forEach(artwork =>{
                const art = document.createElement("img");
                const BaseUrl = resp.config.iiif_url;
                const imageId = artwork.image_id;
                const iiifUrl = `${BaseUrl}/${imageId}/full/,150/0/default.jpg`;
                art.src = iiifUrl;     
                imgContainer.appendChild(art);
            });

            art.addEventListener('click', toggleBlur);
    
            function toggleBlur() {
              this.classList.toggle('blur');
            }
        })
    // .then(resp => console.log(resp))
        .catch(error => console.error("error", error));
}

function randomizePage() {
    const newnum = Math.floor(Math.random() * 9398);
    changepages(newnum);
    // console.log(newnum);
}

const btn = document.getElementById("rand");
btn.addEventListener("click", randomizePage);

// default page 50
const defaultnum = 50;
changepages(defaultnum);


    const peopleFilter = document.getElementById("people");
    const animalFilter = document.getElementById("animals");
    const natureFilter = document.getElementById("nature");
    const foodFilter = document.getElementById("food");
    const waterFilter = document.getElementById("water");
    const noFilter = document.getElementById("everything");




/*image padding*/
// const topbar = document.getElementsByClassName("topbar")[0];
// function topPadding(){
//     const width = topbar.offsetHeight;
//     imgContainer.style.marginTop = `${width}px`;
// }
// topPadding();
