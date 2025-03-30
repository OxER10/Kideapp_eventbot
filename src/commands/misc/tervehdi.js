// Export this function
module.exports = {
    name: "tervehdi",
    description: "Tervehtii",
    callback: (client, interaction) => {
        interaction.reply(`Moikka, ${interaction.user.username}!`);
    }
}