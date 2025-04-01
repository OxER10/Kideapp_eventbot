require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const rest = new REST({ version: "10"}).setToken(process.env.TOKEN);

module.exports = (async () => {
    try {
        console.log("Wiping slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: [] }
        );

        console.log("Slash commands were deleted succesfully!");
    } catch (error) {
        console.log(`Encountered error: ${error}`);
    }
})();