'use strict';

const fsP = require("fs/promises");
const argv = process.argv;


/** cat: takes a path and reads the file with that path.
 * Prints the content of that file */
async function cat(path) {
    try {
        let contents = await fsP.readFile(path, "utf8");
        console.log(contents);
    } catch (err) {
        console.log(`Error reading ${path}`, " Error:", err.message);
        process.exit(1);
    }
}

/** webCat: takes a URL, reads the URL contents,
 * and prints the contents to the console.*/
async function webCat(url) {
    let address = new URL(url);
    try {
        let response = await fetch(address);
        let data = await fsP.readFile(await response, "utf8");
    } catch (err) {
        console.log(`Error fetching ${address}:`, " Error:", err.message);
        process.exit(1);
    }
}

webCat(argv[2]);