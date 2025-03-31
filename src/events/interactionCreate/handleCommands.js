const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only developers are allowed to run this command.",
                    ephemeral: true,
                });
                return;
            }

            if (commandObject.testOnly) {
                if (!(interaction.guild.id === testServer)) {
                    interaction.reply({
                        content: "This command cannot be ran here.",
                        ephemeral: true,
                    });
                    return;
                }
            }

            // Checks permission flags if defined
            if (commandObject.permissionsRequired?.length) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permission.has(permission)) {
                        interaction.reply({
                            content: "Not enough permissions.",
                            ephemeral: true,
                        });
                        break;
                    }
                }
            }

            // Checks bot permission flags if defined
            if (commandObject.botPermission?.length) {
                for (const permission of commandObject.botPermission) {
                    const bot = interaction.guild.members.me;

                    if (!bot.permission.has(permission)) {
                        interaction.reply({
                            content: "I don't have enough permissions :(",
                            ephemeral: true,
                        });
                        break;
                    }
                }
            }

            await commandObject.callback(client, interaction);
        }
    } catch (error) {
        console.log(`Error running this command: ${error}`);
    }
};