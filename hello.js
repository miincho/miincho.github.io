document.addEventListener("DOMContentLoaded", () => {

    let div = document.getElementById("content");
    let span = document.createElement('span');
    let initials = document.createTextNode("MC ");

    span.appendChild(initials);
    span.style.display = "inline";

    for(let i=0; i<div.offsetWidth; i++){
        div.appendChild(span.cloneNode(true));   
    }
        for(let j=0; j<div.offsetHeight; j++){
            div.appendChild(span.cloneNode(true));   
        } 

    div.addEventListener("mouseover",(e)=>{
        if (e.target.tagName === 'SPAN') { //mmm spam
            let spans = div.querySelectorAll('span');

            spans.forEach((span) => {
                span.style.transition = "font-size 1s ease"; 
                span.style.fontSize = "1em";
            });

            //ripple controls 
            const freq = 0.1; 
            const amp = 0.5;
            let targetIndex = Array.from(spans).indexOf(e.target);
            spans.forEach((span, index) => {
                //adjust font size
                let offset = targetIndex - index;
                let fontSize = 1 + amp * Math.sin(offset * freq);
                span.style.fontSize = `${fontSize}em`;
            });
        }
    }); 
});


