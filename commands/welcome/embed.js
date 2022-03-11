const Components = require('../../struct/components')

// set welcome embed
async function setWelcomeEmbed(interaction, client, guild) {
    const embedColorCode = interaction.options.get('color')?.value
    const embedTitle = interaction.options.get('title')?.value
    const embedDescription = interaction.options.get('description')?.value
    const embedThumbnail = interaction.options.get('thumbnail-link')?.value
    const embedBanner = interaction.options.get('banner-link')?.value

    const embedData = {
        embedColorCode,
        embedTitle,
        embedDescription,
        embedThumbnail,
        embedBanner,
    }

    await client.factory.setWelcomeEmbed(embedData, guild.id)
    const dbGuild = await client.factory.getGuildById(guild.id)

    const sampleEmbed = Components.welcomeEmbed(dbGuild)
    const embedSetupDone = Components.successEmbed('Your embed has been successfully set up. \n Test embed is here.')

    interaction.reply({ embeds: [...sampleEmbed.embeds, ...embedSetupDone.embeds] })
}

// testing welcome embed
async function testWelcomeEmbed(interaction, dbGuild) {
    const welcomeEmbed = Components.welcomeEmbed(dbGuild, interaction.user)

    return interaction.editReply(welcomeEmbed)
}

module.exports = { setWelcomeEmbed, testWelcomeEmbed }

