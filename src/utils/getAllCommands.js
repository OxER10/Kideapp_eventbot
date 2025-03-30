// Function to get all commands that can be used in bot

// Import required 
const path = require("path");
const getAllfiles = require("./getAllFiles");

// Export this function
module.exports = (exceptions = []) => {
    let localCommands = [];

    // Saves every command gategory folder from commands folder to variable
    const commandCategories = getAllfiles(
        path.join(__dirname, "..", "commands"),
        true
    );

    for (const commandCategory of commandCategories) {
        // Saves every file path to variable
        const commandFiles = getAllfiles(commandCategory);
        
        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            if (exceptions.includes(commandObject.name)) {
                continue;
            }
            localCommands.push(commandObject);
        }
    }

    // Returns only command names for dynamic filepaths
    return localCommands;
}
