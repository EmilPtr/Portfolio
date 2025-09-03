const revealsR = document.querySelectorAll(".scrollfxr");
const revealsL = document.querySelectorAll(".scrollfxl");

const observerR = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-x-full");
        } else {
            entry.target.classList.add("opacity-0", "translate-x-full");
        }
    })
});
const observerL = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "-translate-x-full");
        } else {
            entry.target.classList.add("opacity-0", "-translate-x-full");
        }
    })
});

revealsR.forEach(element => observerR.observe(element));
revealsL.forEach(element => observerL.observe(element));