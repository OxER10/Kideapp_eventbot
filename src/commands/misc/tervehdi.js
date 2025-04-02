// Export this function
module.exports = {
    name: "tervehdi",
    description: "Tervehtii käyttäjää",
    callback: (client, interaction) => {
        console.log("Moikka");
        interaction.reply(`Moikka, ${interaction.user.username}! Tervetuloa TAMKiin :)`);
    },
};