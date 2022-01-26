const Components = require('../struct/components')

module.exports = {
    name: 'rank',
    async enableRanking(interaction, client, guild, dbGuild) {
        if (dbGuild.rankingStatus) {
            const embed = Components.errorEmbed(`Rank service is already enabled`)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.updateRankingStatus(guild.id, true)

        const successEmbed = Components.successEmbed(
            'Ranking mechanism has been enabled for your guild',
        )

        return interaction.editReply(successEmbed)
    },

    async disableRanking(interaction, client, guild, dbGuild) {
        if (dbGuild.rankingStatus) {
            const embed = Components.errorEmbed(`Rank service is already disabled`)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.updateRankingStatus(guild.id, false)

        const successEmbed = Components.successEmbed(
            'Ranking mechanism has been disabled for your guild',
        )

        return interaction.editReply(successEmbed)
    },

    async resetRanking(interaction, client, guild) {
        await client.factory.resetRanking(guild.id)

        const successEmbed = Components.successEmbed('The ranks has been reset for your guild')

        return interaction.editReply(successEmbed)
    },

    async getLeaderboard(interaction, client, guild) {
        const limit = interaction.options.get('top')?.value || 10
        const topRankers = await client.factory.getLeaderboard(guild.id, limit)
        const leaderboardComponent = Components.leaderboard(topRankers)

        return interaction.editReply(leaderboardComponent)
    },

    async exec(interaction) {
        await interaction.deferReply()
        const { client, guild } = interaction
        const dbGuild = await client.factory.getGuildById(guild.id)
        switch (interaction.options.getSubcommand()) {
            case 'enable':
                return this.enableRanking(interaction, client, guild, dbGuild)
            case 'disable':
                return this.disableRanking(interaction, client, guild, dbGuild)
            case 'reset':
                return this.resetRanking(interaction, client, guild)
            case 'leaderboard':
                return this.getLeaderboard(interaction, client, guild)
            default:
                return 'not implmented'
        }
    },
}
