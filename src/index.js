require('dotenv').config();
const { Client, IntentsBitField, ChatInputCommandInteraction } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Event listener for messages
client.on("messageCreate", (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content === "Moi") {
        message.reply(`No moro moro, ${message.author.username}!`);
    }
});

// Event listener for slash commands
client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "tervehdi") {
        interaction.reply(`Moikka, ${interaction.user.username}!`)
    }

    if (interaction.commandName === "events") {
        fetch(`https://parsehub.com/api/v2/projects/${process.env.PARSEHUB_PROJECT_TOKEN}/run`, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            body: `api_key=${process.env.PARSEHUB_API}`
        })
        .then(response => {
            if(!response.ok) return response.text().then(text => { throw new Error(`${response.status}: ${text}`); });
            return response.headers.get("content-type")?.includes("application/json") 
            ? response.json() 
            : response.text();
        })
        .then(data => {
            fetch(`https://parsehub.com/api/v2/runs/${data.run_token}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
                body: `api_key=${process.env.PARSEHUB_API}`
            })
            .then(responseRunFinished => {
                if(!responseRunFinished.ok) return responseRunFinished.text().then(text => { throw new Error(`${responseRunFinished.status}: ${text}`); });
                return responseRunFinished.headers.get("content-type")?.includes("application/json") 
                ? responseRunFinished.json() 
                : responseRunFinished.text();
            })
            .then(dataRunFinished => console.log("Success:", dataRunFinished))
            .catch(error => console.error("Error:", error));
        })
        .catch(error => console.error("Error:", error));
    }

});

// Call event handler function
eventHandler(client);

client.login(process.env.TOKEN);