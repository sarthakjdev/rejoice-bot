/**
 * star board command of the rejoice bot
 */

const starBoardConfigs = require('./set-config')
const enable = require('./enable')
const disable = require('./disable')

module.exports = {
    adminOnly: true,
    name: 'star-board',

    async exec(interaction) {
        const { client, guild } = interaction
        await interaction.deferReply()
        const dbGuild = await client.factory.getGuildById(guild.id) // fetching the guild from the db
        switch (interaction.options.getSubcommand()) {
            case 'set-channel':
                return starBoardConfigs.setChannel(interaction, client, guild, dbGuild)
            case 'set-reactions':
                return starBoardConfigs.setReactions(interaction, client, guild, dbGuild)
            case 'enable':
                return enable(interaction, client, guild, dbGuild)
            case 'disable':
                return disable(interaction, client, guild, dbGuild)
            default:
                return 'not implented'
        }
    },

}

