const { ApplicationCommandOptionType } = require("discord.js");
const getKideappEvents = require("../../utils/getKideappEvents");
const kideEventEmbedder = require("../../utils/kideEventEmbedder")

module.exports = {
    callback: async (client, interaction) => {
        getKideappEvents().then (data => {
            for (const event of data.model) {
                interaction.channel.send({ embeds: [kideEventEmbedder(event)]});
            }
        });
    },

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
};