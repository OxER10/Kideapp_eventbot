const getKideappEvents = require("../../utils/getKideappEvents");
const kideEventEmbedder = require("../../utils/kideEventEmbedder")

module.exports = {
    callback: async (client, interaction) => {
        getKideappEvents().then (data => {
            let count = 0, index = 0;
            while (count < 10 || index < data.model.length)  {
                try {
                    if (data.model[index].availability === 0 || !data.model[index].salesStarted || data.model[index].salesEnded || !data.model[index].salesOngoing) {
                        index++;
                    }
                    else {
                        interaction.channel.send({ embeds: [kideEventEmbedder(data.model[index])]});
                        index++;
                        count++;
                    }
                } catch (error) {

                }
            }
        });
    },

    name: "availableevents",
    description: "Shows 10 upcoming Kide.app events with available tickets",
    devOnly: false,
};