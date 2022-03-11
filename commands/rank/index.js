/**
 * rank command of the rejoice bot
 */

const enable = require('./enable')
const disable = require('./disable')
const rankManipulate = require('./rank')
const guildRankManipulate = require('./guildRanking')

module.exports = {
    name: 'rank',

    async exec(interaction) {
        await interaction.deferReply()
        const { client, guild } = interaction
        const dbGuild = await client.factory.getGuildById(guild.id)
        switch (interaction.options.getSubcommand()) {
            case 'enable':
                return enable(interaction, client, guild, dbGuild)
            case 'disable':
                return disable(interaction, client, guild, dbGuild)
            case 'reset':
                return guildRankManipulate.resetRanking(interaction, client, guild)
            case 'leaderboard':
                return guildRankManipulate.getLeaderboard(interaction, client, guild)
            case 'check':
                return rankManipulate.getRank(interaction, client, guild, dbGuild)
            case 'update':
                return rankManipulate.updateRank(interaction, client, guild)
            default:
                return 'not implmented'
        }
    },
}

