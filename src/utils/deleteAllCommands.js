require("dotenv").config();
const { testServer, clientid } = require("../../config.json");
const { REST, Routes} = require("discord.js");

const rest = new REST({ version: "10"}).setToken(process.env.TOKEN);

module.exports = (async () => {
    try {
        console.log("Wiping slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(clientid, testServer),
            { body: [] }
        );

        console.log("Slash commands were deleted succesfully!");
    } catch (error) {
        console.log(`Encountered error: ${error}`);
    }
})();