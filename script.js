// container = canvas 
let container = document.querySelector(".container");

//function to init canvas with pixels
function draw(pixelCount) {
    const allDivs = container.querySelectorAll("div");
    allDivs.forEach(div => div.remove());
    for (let i = 0; i < (pixelCount * pixelCount); i++) {
        let div = document.createElement("div");
        div.classList.add("square");
        div.style.flex = `1 0 calc(100% / ${pixelCount})`;
        div.style.color = "white";
        container.appendChild(div);
    }
}

// draw default case 
draw(16);

// function to color pixel
function color(square) {
    square.classList.add("colored-black");
    return;
}

// add color function to mouse over
let mouseDown = false;
document.body.addEventListener("mousedown", (event) => {
    mouseDown = true;
});
document.body.addEventListener("mouseup", () => {
    mouseDown = false;
});
container.addEventListener("mouseover", (event) => {
    if (mouseDown) {
        color(event.target);
    }
});
container.addEventListener("mousedown", (event) => {
    color(event.target);
});

// add reset function to reset button
const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
    let pixelCount = prompt("Enter the pixel count of the new canvas.", "16");

    if (isNaN(pixelCount)) {
        pixelCount = prompt("Invalid pixel count, try again.", "16");
    }

    pixelCount = Math.round(parseInt(pixelCount));
    if (pixelCount > 128) {
        pixelCount == 128;
    }
    if (pixelCount <= 0) {
        pixelCount = 1;
    }
    
    draw(pixelCount);
});


    