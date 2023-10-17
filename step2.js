'use strict';

const fsP = require("fs/promises");


/** cat: takes a path and reads the file with that path.
 * Prints the content of that file */
async function cat(path) {
    let contents;
    try {
        contents = await fsP.readFile(path, "utf8");
    } catch (err) {
        console.log(`Error reading ${path}`, " Error:", err.message);
        process.exit(1);
    }
    console.log(contents);
}

/** webCat: takes a URL, reads the URL contents,
 * and prints the contents to the console.*/
async function webCat(url) {
    try {
        let response = await fetch(url);
        const data = await response.text()
        console.log(data)
    } catch (err) {
        console.log(`Error fetching ${url}:`, err);
        process.exit(1);
    }
}

const argv = process.argv;

try {
    const url = new URL(argv[2]);
    webCat(url)
} catch {
    cat(argv[2])
}