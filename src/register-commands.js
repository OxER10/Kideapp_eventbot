require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: "tervehdi",
        description: "Tervehtii",
    },
    {
        name: "events",
        description: "Shows all upcoming events.",
    },
    {
        name: "eventskeyword",
        description: "Shows event with desired Keywords.",
        options: [
            {
                name: "first-keyword",
                description: "The first keyword",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "second-keyword",
                description: "The second keyword",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "third-keyword",
                description: "The third keyword",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ]
    }
];

const rest = new REST({ version: "10"}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log("Slash commands were registered succesfully!");
    } catch (error) {
        console.log(`Encountered error: ${error}`);
    }
})();