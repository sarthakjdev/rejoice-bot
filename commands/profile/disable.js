const Components = require('../../struct/components')

async function disableProfileFeature(interaction, client, guild, dbGuild) {
    const { dbProfileCommandsChannel } = dbGuild
    if (!dbProfileCommandsChannel) { // if no welcome channel in db => service not enabled, hence no stoppage
        const embed = Components.errorEmbed(`You don't have profile service enabled for your server!`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setProfileService(guild.id, null)

    const embed = Components.successEmbed('Successfully stopped the welcome service.')

    return interaction.editReply(embed)
}

module.exports = disableProfileFeature
