'use strict'

const fsP = require("fs/promises");
const argv = process.argv;
/** cat: takes a path and reads the file with that path. Prints the content of that file */
async function cat(path) {
    try {
        let contents = await fsP.readFile(path, "utf8")
        console.log(contents)
    } catch (err) {
        console.log(`Error reading ${path}`, " Error:", err.message)
        process.exit(1);
    }
}

cat(argv[2])