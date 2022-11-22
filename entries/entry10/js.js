function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    strokeWeight(60);
    if(mouseIsPressed === true){
        line(mouseX, mouseY, pmouseX, pmouseY)
    }
}