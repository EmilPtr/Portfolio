const img = document.getElementById("console");
const images = ["console1.png", "console2.png"];
let index = 0;

setInterval(() => {
    index = (index + 1) % images.length;
    img.src = images[index];
}, 750);   