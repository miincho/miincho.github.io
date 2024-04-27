const titleDivs = document.querySelectorAll(".project-title");

function randBaseline(element) {
    const text = element.textContent;
    const randomizedText = Array.from(text).map(char=>{
        const baselineShift = Math.floor(Math.random() * 3) - 1.5; 
        return `<span style="vertical-align: ${baselineShift}px;">${char}</span>`;
    }).join('');
    element.innerHTML = randomizedText;
}

function reset(element, originalText) {
    element.innerHTML = originalText; 
}

titleDivs.forEach(titleDiv=>{
    //check if randomized
    let isRandomized = false; 
    //store original to reset mouseout
    let originalText = titleDiv.innerHTML;

    //randomize/reset on mouseenter/mouseleave
    titleDiv.addEventListener('mouseenter', () => {
        if (!isRandomized) {
            randBaseline(titleDiv); 
            isRandomized = true;
        }
    });
    titleDiv.addEventListener('mouseleave', () => {
        if (isRandomized) {
            reset(titleDiv, originalText); 
            isRandomized = false;
        }
    });
});
