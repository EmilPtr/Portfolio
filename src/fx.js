let str = `
#include "../json/json.hpp"
#include <fstream>
#include <fcntl.h>
#include <iostream>
#include "helper_functions.h"

std::string find_bin_path() {
    char path[PATH_MAX];
    // The proc.self/exe symlink always points to the process that accesses it
    const ssize_t count = readlink("/proc/self/exe", path, sizeof(path) - 1);
    // If count is -1 something has gone catastrophically wrong
    if (count != -1) {
        path[count] = '\0';
        const std::string path_str = path;
        return path_str.substr(0, path_str.find_last_of('/'));
    }
    std::cerr << "Something has gone catastrophically wrong.";
    exit(EXIT_FAILURE);
    return "";
}

nlohmann::json read_cache() {
    std::ifstream cache_file;
    cache_file.open(find_bin_path() + "/daemon_cache.json");
    if (!cache_file.is_open()) {
        std::cerr << "Failed to open cache file" << "\\n";
        exit(EXIT_FAILURE);
    }
    nlohmann::json cache_json = nlohmann::json::parse(cache_file);
    cache_file.close();
    return cache_json;
}

std::vector<std::string> split_by_space(const std::string &s, const std::string &bin) {
    std::vector<std::string> arg_vector;
    std::string arg;
    // Algorithm to search through string for whitespace and push the word to vector if found
    arg_vector.push_back(bin);
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == ' ') {
            arg_vector.push_back(arg);
            arg.clear();
        }
        else arg += s[i];
    }
    arg_vector.push_back(arg);

    return arg_vector;
}
`

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let canvas = document.getElementById("vfx");
const c = canvas.getContext("2d");

function resizeCanvas() {
    const dpr = (window.devicePixelRatio || 1) * 0.2;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    c.setTransform(1, 0, 0, 1, 0, 0); 
    c.scale(dpr, dpr); 
}

resizeCanvas();

c.fillStyle = "oklch(20.8% 0.042 265.755)";
c.fillRect(0, 0, canvas.width*5, canvas.height*5);

c.font = "20px monospace";

async function draw() {
    let x = 10;
    let y = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        if (char === '\n') {
            x = 10;
            y += 30;
            continue;
        }
        c.fillStyle = "#22FF00";
        c.shadowColor = "#22FF00";
        c.shadowBlur = 5;
        c.fillText(char, x, y);
        x += 16;
        await sleep(1);
    }
}


function runAnimation() {
    draw().then(() => {
        c.fillStyle = "oklch(20.8% 0.042 265.755)";
        c.fillRect(0, 0, canvas.width*5, canvas.height*5);
        runAnimation();
    });
}

runAnimation();