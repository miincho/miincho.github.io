//coordinates for the points 
const data = [
    {
        word: "BEWITCH",
        definition: "to enchant someone",
        locX: 44,
        locY: 43
    }, 
    {
        word: "GLITTERS",
        locX: 58,
        locY: 25.5
    }, 
    {
        word: "LABOR OF LOVE",
        locX: 36 ,
        locY: 35
    }, 
    {
        word: "FORGIVING",
        locX:19.5 ,
        locY: 32.5
    }, 
    {
        word: "TENDER",
        locX: 81,
        locY:26
    }, 
    {
        word: "SENSUOUS",
        locX: 79,
        locY: 16
    }, 
    {
        word: "ATONE FOR",
        locX: 23,
        locY: 5
    }, 
    {
        word: "OUR SOULS",
        locX: 28,
        locY: 10.5
    }, 
    {
        word: "INTRINSIC",
        locX: 3,
        locY: 40.5
    }, 
    {
        word: "TO THE MOON",
        locX: 19,
        locY: 43.5
    }, 
    {
        word: "COST OF",
        locX: 12,
        locY: 48
    }, 
    {
        word: "IMPOSSIBLE",
        locX: 2,
        locY: 84
    }, 
    {
        word: "LONELY",
        locX: 28,
        locY: 40.5
    }, 
    {
        word: "IMAGINE",
        locX: 10,
        locY: 6.5
    }, 
    {
        word: "CONSCIOUSNESS",
        locX: 38.5,
        locY: 53
    }, 
    {
        word: "KARMA",
        locX: 13,
        locY: 68.5
    }, 
    {
        word: "FORCE OF NATURE",
        locX: 4,
        locY: 72.5
    }, 
    {
        word: "UNUTTERABLE",
        locX: 29,
        locY: 97
    }, 
    {
        word: "AN AUTOMATON",
        locX: 56,
        locY: 74
    }, 
    {
        word: "UNDESERVING OF",
        locX: 54.5,
        locY: 55
    }, 
    {
        word: "ACCUMULATION OF ANGUISH",
        locX: 10,
        locY: 89.5
    }, 
    {
        word: "INEXHAUSTIBLE",
        locX: 44.5,
        locY: 83
    }, 
    {
        word: "ABSENCE OF LIGHT",
        locX: 70.5,
        locY: 84
    }, 
    {
        word: "INCANDESCENT",
        locX: 88,
        locY: 11.5
    }, 
    {
        word: "EXQUISITE",
        locX: 77,
        locY: 4
    }, 
    {
        word: "DAZED",
        locX: 94,
        locY: 44
    }, 
    {
        word: "FOREVER",
        locX: 79.5,
        locY: 72
    }, 
    {
        word: "EBULLIENCE",
        locX: 88,
        locY: 31.5
    }, 
    {
        word: "MIRACLE",
        locX: 92,
        locY: 89.5
    }, 
    {
        word: "EUDAIMONIA",
        locX: 90.5,
        locY: 59
    }, 
    {
        word: "PEACHY",
        locX: 68,
        locY: 44.5
    }, 
    {
        word: "SOLITUDE",
        locX: 84.5,
        locY: 53.5
    }, 
    {
        word: "IDYLLIC",
        locX: 77,
        locY: 37
    }
];

let canvas = document.getElementById("draw");
let container = document.getElementById("canvas-resizer");
let whisper = document.getElementById("btn1");
let wonder = document.getElementById("btn2");
let reflect = document.getElementById("btn3");
let spite = document.getElementById("btn4");
let all = document.getElementById("btn5");

const ctx = canvas.getContext("2d");
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

//circles
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

//check mouse location with distance formula
function hover(mouseX, mouseY, circleX, circleY) {
    return Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2) < 8; //making it slightly larger than radius for easier hovering
}

//redraw circles and associated text based on mouse movement
function redrawCircles(mouseX, mouseY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    grid(); //redraw grid

    //redraw circles
    data.forEach(item => {
        const pixelX = (item.locX / 100) * canvas.width;
        const pixelY = (item.locY / 100) * canvas.height;
        drawCircle(pixelX, pixelY);

        // Check if mouse is over the current circle
        if (hover(mouseX, mouseY, pixelX, pixelY, 3)) {
            ctx.font = "14.5px IBM Plex Mono";
            ctx.fillText(`${item.word}`, pixelX + 15, pixelY + 5);
        }
    });
}

//redraw circles and associated text based on mouse position
canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    redrawCircles(mouseX, mouseY);
});

function grid() {
    const boxWidth = canvas.width; 
    const boxHeight = canvas.height; 

    const x = centerX - boxWidth / 2;
    const y = centerY - boxHeight / 2;

    // Rectangle
    ctx.strokeStyle = "black";
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2; 
    ctx.strokeRect(x, y, boxWidth, boxHeight);
    // X-axis
    ctx.setLineDash([]);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    // Ellipse
    const rx = boxWidth / 2; 
    const ry = boxHeight / 2; 
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, rx, ry, 0, 0, 2 * Math.PI);
    ctx.setLineDash([5, 5]);
    ctx.stroke();
}

//initializing grid and circles
grid();
data.forEach(item => {
    const pixelX = (item.locX / 100) * canvas.width;
    const pixelY = (item.locY / 100) * canvas.height;
    drawCircle(pixelX, pixelY);
});
