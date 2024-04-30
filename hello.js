document.addEventListener("DOMContentLoaded", () => {
    const div = document.getElementById("content");
    const maxSpans = 1500; 
    const fontSizeMultiplier = 3; 
    const cooldownTime = 1000;

    let span = document.createElement('span');
    let initials = document.createTextNode("MC ");
    span.appendChild(initials);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const spanWidth = Math.ceil(screenWidth / (span.offsetWidth * fontSizeMultiplier));
    const spanHeight = Math.ceil(screenHeight / (span.offsetHeight * fontSizeMultiplier));

    const numSpansToCreate = Math.min(maxSpans, spanWidth * spanHeight);

    for (let i = 0; i < numSpansToCreate; i++) {
        div.appendChild(span.cloneNode(true));
    }

    console.log(`Total spans created: ${numSpansToCreate}`);

    let cooldownActive = false;
    div.addEventListener("mouseover", (e) => {
        if (!cooldownActive && e.target.tagName === 'SPAN') {
            const spans = div.querySelectorAll('span');

            //disable the effect for the cooldown period
            cooldownActive = true;
            setTimeout(() => {
                cooldownActive = false;
            }, cooldownTime);

            spans.forEach((span) => {
                span.style.transition = "font-size 0.5s ease";
                span.style.fontSize = "1em";
            });

            const freq = 0.1;
            const amp = 0.5;
            const targetIndex = Array.from(spans).indexOf(e.target);
            spans.forEach((span, index) => {
                const offset = targetIndex - index;
                const fontSize = 1 + amp * Math.sin(offset * freq);
                span.style.fontSize = `${fontSize}em`;
            });
        }
    });
});
