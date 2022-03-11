const Components = require('../../struct/components')

// Setting up the initial welcome message service along with tiimer :
async function startStarBoard(interaction, client, guild, dbGuild) {
    const channelToSet = await interaction.options.get('channel').value
    const numberOfReactions = await interaction.options.get('reactions')?.value
    const { dbStarBoardChannel } = dbGuild // starred channel for the guild as per the database
    if (dbStarBoardChannel) { // if already a dbGuildChannel => service alredy enabled
        const embed = Components.errorEmbed(`You have already enabled star board service on <#${dbStarBoardChannel}>`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setStarBoardService(guild.id, channelToSet, numberOfReactions)
    const setupSuccessEmbed = Components.successEmbed(`<@${interaction.user.id}>Congrats! Star board set up has been done!`)

    return interaction.editReply(setupSuccessEmbed)
}

module.exports = startStarBoard
