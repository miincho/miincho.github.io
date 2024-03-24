const url = `https://api.artic.edu/api/v1/artworks?page=${pagenum}&limit=100`; 
var pagenum = 50;

fetch(url)
    .then(response => response.json())
    .then((resp) => {
        const imgContainer = document.getElementById("images");
        resp.data.forEach(artwork =>{
            const art = document.createElement("img");
            const BaseUrl = resp.config.iiif_url;
            const imageId = artwork.image_id;
            const iiifUrl = `${BaseUrl}/${imageId}/full/,150/0/default.jpg`;
            art.src = iiifUrl;     
            imgContainer.appendChild(art);
        });

        // art.addEvent
    })
    .catch(error => console.error("error", error));


    function randomizePage(){
        const pagenum = Math.floor(Math.random() * 9398);
        // console.log(pagenum);
    }

    const btn = document.getElementById("rand");
    btn.addEventListener("click", randomizePage);



    const peopleFilter = document.getElementById("people");
    const animalFilter = document.getElementById("animals");
    const natureFilter = document.getElementById("nature");
    const foodFilter = document.getElementById("food");
    const waterFilter = document.getElementById("water");
    const noFilter = document.getElementById("everything");

        // .then(resp => console.log(resp))


/*image padding*/
// const topbar = document.getElementsByClassName("topbar")[0];
// function topPadding(){
//     const width = topbar.offsetHeight;
//     imgContainer.style.marginTop = `${width}px`;
// }
// topPadding();
