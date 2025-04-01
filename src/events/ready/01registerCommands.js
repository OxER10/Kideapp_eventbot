// Function to registers every command that can be used in bot inside the server

// Import config config.json to get correct server ids and who can use the bot
const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const deleteAllCommands = require("../../utils/deleteAllCommands");

module.exports = async (client) => {
    try {
        deleteAllCommands;
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        for (const localCommand of localCommands) {
            // Destructure objects
            const { name, description, options} = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Command "${name}" was deleted.`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Command "${name}" was modified.`);
                }
            } 
            else {
                if (localCommand.deleted) {
                    console.log(
                        `Command "${name}" was skipped, since it's set to delete.`
                    );
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Command "${name}" was registered.`);
            }
        }
    } catch (error) {
        console.log(`Encountered error: ${error}!`)
    }
};