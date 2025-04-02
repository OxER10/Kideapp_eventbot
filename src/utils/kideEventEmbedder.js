const { EmbedBuilder } = require("discord.js");

module.exports = (data) => {
    let tickets;
    const eventEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${data.name}`)
        .setURL(`https://kide.app/events/${data.id}`)
        .setImage(`https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/${data.mediaFilename}`)
        .setAuthor({ name: data.companyName, iconURL: `https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/${data.companyMediaFilename}`})
        .setFooter({ text: "Kide.app Bot - Oskari Järvinen"});
    if (!data.salesEnded || data.salesOngoing) {
        if(data.hasInventoryItems && data.availability == 0 || data.hasFreeInventoryItems && data.availability == 0) {
            tickets = "Sold out";
        }
        else {
            tickets = data.availability;
        }
    }
    else {
        tickets = "Sales ended";
    }
    let minPrice = data.minPrice.eur;
    let maxPrice = data.maxPrice.eur;
    if (minPrice === maxPrice) {
        if(maxPrice == undefined) {
            maxPrice = "Free entry";
        }
        else {
            maxPrice = maxPrice / 100.0 + "€"; 
        }
        eventEmbed.setDescription(
            `\n⌚ - ${new Date(data.dateActualFrom).toLocaleDateString()} - ${new Date(data.dateActualUntil).toLocaleDateString()}\n🗺️ - ${data.place}\n💸 - ${maxPrice}\n🎫 - ${tickets}\n⌛ - ${new Date(data.dateSalesFrom).toLocaleDateString()} - ${new Date(data.dateSalesUntil).toLocaleDateString()}\n❤️ - ${data.favoritedTimes}`
            //eventEmbed.setDescription(`Time: ${new Date(data.dateActualFrom).toLocaleDateString()} - ${new Date(data.dateActualFrom).toLocaleDateString()}Place: ${data.place}Price: ${price}Tickets: ${tickets}Favorites: ${data.favoritedTimes}`
        );
    }
    else {
        maxPrice = maxPrice / 100.0 + "€";
        minPrice = minPrice / 100.0 + "€";
        eventEmbed.setDescription(
            `\n⌚ - ${new Date(data.dateActualFrom).toLocaleDateString()} - ${new Date(data.dateActualUntil).toLocaleDateString()}\n🗺️ - ${data.place}\n💸 - ${minPrice}-${maxPrice}\n🎫 - ${tickets}\n⌛ - ${new Date(data.dateSalesFrom).toLocaleDateString()} - ${new Date(data.dateSalesUntil).toLocaleDateString()}\n❤️ - ${data.favoritedTimes}`
            //eventEmbed.setDescription(`Time: ${new Date(data.dateActualFrom).toLocaleDateString()} - ${new Date(data.dateActualFrom).toLocaleDateString()}Place: ${data.place}Price: ${minPrice}-${maxPrice}Tickets: ${tickets}Favorites: ${data.favoritedTimes}`
        );
    }
    return eventEmbed;
} 