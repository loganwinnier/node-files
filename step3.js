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
    return contents
}

/** webCat: takes a URL, reads the URL contents,
 * and prints the contents to the console.*/
async function webCat(url) {
    let response;
    try {
        response = await fetch(url);
    } catch (err) {
        console.log(`Error fetching ${url}:`, err);
        process.exit(1);
    }
    const data = await response.text()
    console.log(data)
    return data
}

async function writeCat(fileName, path) {
    let content;
    try {
        const url = new URL(path);
        content = await webCat(url);
    } catch {
        content = await cat(path);
    }
    try {
        await fsP.writeFile(fileName, content, "utf8");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Successfully wrote to file");
}


const argv = process.argv;

if (argv[2] === '--out') {
    writeCat(argv[3], argv[4])

} else {
    try {
        const url = new URL(argv[2]);
        webCat(url)
    } catch {
        cat(argv[2])
    }
}