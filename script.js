let container = document.querySelector(".container");
for (let i = 0; i < (128*128); i++) {
    let div = document.createElement("div");
    div.classList.add("square");
    container.appendChild(div);
}a