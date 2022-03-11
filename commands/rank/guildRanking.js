const Components = require('../../struct/components')

async function resetRanking(interaction, client, guild) {
    await client.factory.resetRanking(guild.id)

    const successEmbed = Components.successEmbed('The ranks has been reset for your guild')

    return interaction.editReply(successEmbed)
}

async function getLeaderboard(interaction, client, guild) {
    const limit = interaction.options.get('top')?.value || 10
    const topRankers = await client.factory.getLeaderboard(guild.id, limit)
    const leaderboardComponent = Components.leaderboard(topRankers)

    return interaction.editReply(leaderboardComponent)
}

module.exports = {
    resetRanking,
    getLeaderboard,
}
