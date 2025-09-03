nav = document.querySelector("#navbar");
btn = document.querySelector("#ddsvg");
logo = document.querySelector("#socials");

nav.addEventListener("mouseover", () => {
    btn.classList.add("-translate-y-100", "rotate-1000");
    socials.classList.remove("-translate-y-100");
});
nav.addEventListener("mouseout", () => {
    btn.classList.remove("-translate-y-100", "rotate-1000");
    socials.classList.add("-translate-y-100");
});