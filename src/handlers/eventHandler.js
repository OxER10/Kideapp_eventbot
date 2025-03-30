// Function that 

// Imports these to variables
const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

// Exports this function to be used
module.exports = (client) => {
    // Creates the paths to the folders
    const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

    for (const eventFolder of eventFolders) {
        // Gets every file paths inside the folders
        const eventFiles = getAllFiles(eventFolder);

        // Sorts through files if some files need priority
        eventFiles.sort((a, b) => a > b);
        
        // Replaces windows backslashes with forward slashes for consistency
        // Gets the name of the event based on the filename
        const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
        
        // Loops through every event name and starts the required event handlers
        client.on(eventName, async (argument) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, argument);
            }
        })
    }
}