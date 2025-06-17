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
    square.classList.add("colored")
    square.style.backgroundColor = getRandomColor();
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
    if (!mouseDown) {
        return;
    }
    if (event.target.classList.contains("colored")) {
        const rgb = event.target.style.backgroundColor;
        const hex = rgbToHex(rgb);
        event.target.style.backgroundColor = darkenColor(hex, 0.2);
    } else {
        color(event.target);
    }
});
container.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("colored")) {
        const rgb = event.target.style.backgroundColor;
        const hex = rgbToHex(rgb);
        event.target.style.backgroundColor = darkenColor(hex, 0.2);
    } else {
        color(event.target);
    }
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
        pixelCount = 128;
    }
    if (pixelCount <= 0) {
        pixelCount = 1;
    }
    
    draw(pixelCount);
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function darkenColor(hex, percent) {
    // Remove # if present
    hex = hex.replace(/^#/, '');

    // Parse r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Decrease each component by percentage
    r = Math.max(0, Math.floor(r * (1 - percent)));
    g = Math.max(0, Math.floor(g * (1 - percent)));
    b = Math.max(0, Math.floor(b * (1 - percent)));

    // Convert back to hex and pad with zeros if needed
    const toHex = (val) => val.toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(Number);
    return "#" + result.map(x => x.toString(16).padStart(2, '0')).join('');
}
    