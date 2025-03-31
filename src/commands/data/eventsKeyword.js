const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
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
    ],
}