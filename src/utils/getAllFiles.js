// Requires these
const fs = require("fs");
const path = require("path");

// Exports a funtion to be used
module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    try {
        // Saves every file from the called directory to variable
        const files = fs.readdirSync(directory, { withFileTypes: true });

        // Checks files if it is a folder or a file
        for (const file of files) {
            // Creates a filepath that is pushed to an array
            const filePath = path.join(directory, file.name);

            if (foldersOnly) {
                // If folders only is true, pushes only folder paths
                if (file.isDirectory()) {
                    fileNames.push(filePath);
                }
            }
            else {
                // Else pushes every file
                if (file.isFile()) {
                    fileNames.push(filePath);
                }
            }
        } 
    }
    catch (error) {
        console.error(`Error reading directory ${directory}: ${error}`);
    }

    // returns filepaths as objects
    return fileNames;
}