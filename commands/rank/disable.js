const Components = require('../../struct/components')

async function disableRanking(interaction, client, guild, dbGuild) {
    if (dbGuild.rankingStatus) {
        const embed = Components.errorEmbed(`Rank service is already disabled`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.updateRankingStatus(guild.id, false)

    const successEmbed = Components.successEmbed(
        'Ranking mechanism has been disabled for your guild',
    )

    return interaction.editReply(successEmbed)
}

module.exports = disableRanking
