const Components = require('../../struct/components')

// To stop the welcome messages
async function stopWelcome(interaction, client, guild, dbGuild) {
    const dbWelcomeChannel = dbGuild.welcomeChannel
    if (!dbWelcomeChannel) { // if no welcome channel in db => service not enabled, hence no stoppage
        const embed = Components.errorEmbed(`You don't have welcome service enabled for your server!`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setWelcomeService(guild.id, null, null)

    const embed = Components.successEmbed('Successfully stopped the welcome service.')

    return interaction.editReply(embed)
}

module.exports = stopWelcome
