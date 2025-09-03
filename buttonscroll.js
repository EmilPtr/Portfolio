let aboutb = document.getElementById("aboutb");
let projectsb = document.getElementById("projectsb");

aboutb.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({behavior: "smooth"});
});

projectsb.addEventListener("click", () => {
    document.getElementById("projects").scrollIntoView({behavior: "smooth"});
});