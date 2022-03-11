const Components = require('../../struct/components')

async function enableRanking(interaction, client, guild, dbGuild) {
    if (dbGuild.rankingStatus) {
        const embed = Components.errorEmbed(`Rank service is already enabled`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.updateRankingStatus(guild.id, true)

    const successEmbed = Components.successEmbed(
        'Ranking mechanism has been enabled for your guild',
    )

    return interaction.editReply(successEmbed)
}

module.exports = enableRanking
