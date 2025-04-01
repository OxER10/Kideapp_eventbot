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

    name: "allevents",
    description: "Shows all upcoming Kide.app events.",
    devOnly: true,
};