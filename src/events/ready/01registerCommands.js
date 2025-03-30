// Function to registers every command that can be used in bot inside the server

// Import config config.json to get correct server ids and who can use the bot
const { testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getAllCommands");
module.exports = (client) => {
    const localCommands = getLocalCommands();

    try {
        const localCommands = getLocalCommands();
    } catch (error) {
        console.log(`There was an error: ${error}!`)
    }
}