const images= [
    "imgs/click1.png", "imgs/click2.png", "imgs/click3.png",
     "imgs/click4.png", "imgs/click5.png" 
    ]

    let i = 0 
    function placeImage(x, y) {

        const nextImage = images[i]

        const img = document.createElement("img")
        img.setAttribute("src", nextImage)
        img.style.left = x + "px"
        img.style.top = y + "px"

        document.body.appendChild(img)

        i = i + 1

        if (i >= images.length) { 
            i=0
        }
    }



document.addEventListener("click", function(event){
    event.preventDefault()
    placeImage (event.pageX, event.pageY)
})