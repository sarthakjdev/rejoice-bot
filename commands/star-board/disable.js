const Components = require('../../struct/components')

// To stop the welcome messages
async function stopStarBoard(interaction, client, guild, dbGuild) {
    const dbStarBoardChannel = dbGuild.starBoardChannel
    if (!dbStarBoardChannel) { // if no welcome channel in db => service not enabled, hence no stoppage
        const embed = Components.errorEmbed(`You don't have star-board service enabled for your server!`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setStarBoardService(guild.id, null, null)

    const embed = Components.successEmbed('Successfully stopped the star-board service.')

    return interaction.editReply(embed)
}

module.exports = stopStarBoard
