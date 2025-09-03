async function typeWriter(id) {
    let element = document.getElementById(id);
    let str = element.innerText;
    for (let i = 0; i <= str.length; i++) {
        element.innerText = str.slice(0, i) + '█';
        await sleep(200);
    }
    for (let i = 0; i < 4; i++) {
        element.innerText = str + '█';
        await sleep(400);
        element.innerText = str + ' ';
        await sleep(400);
    }
    typeWriter(id); 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blinkCursor(id) {
    let element = document.getElementById(id);
    let str = element.innerText;
    while (true) {
        element.innerText = str + '█';
        await sleep(400);
        element.innerText = str + '_';
        await sleep(400);
    }
}

typeWriter("about-title");
typeWriter("projects-title");
typeWriter("title");
blinkCursor("aboutb");
blinkCursor("projectsb");
