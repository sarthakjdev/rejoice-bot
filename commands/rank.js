const Components = require('../struct/components')

module.exports = {
    name: 'rank',
    async enableRanking(interaction, client, guild) {
        await client.factory.updateRankingStatus(guild.id, true)

        const successEmbed = await Components.successEmbed(
            'Ranking mechanism has been enabled for your guild',
        )

        return interaction.editReply(successEmbed)
    },
    async disableRanking(interaction, client, guild) {
        await client.factory.updateRankingStatus(guild.id, false)

        const successEmbed = await Components.successEmbed(
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
        const topRankers = await client.factory.getLeaderboard(guild.id)
        const leaderboardComponent = await Components.leaderboard(topRankers)

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
                return this.disableRanking(interaction, client, guild)
            case 'reset':
                return this.resetRanking(interaction, client, guild)
            case 'leaderboard':
                return this.getLeaderboard(interaction, client, guild)
            default:
                return 'not implmented'
        }
    },
}
