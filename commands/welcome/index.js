/**
 * welcome command of the rejoice bot
 */

const enable = require('./enable')
const disable = require('./disable')
const { setChannel, setTime } = require('./set-config')
const { setWelcomeEmbed, testWelcomeEmbed } = require('./embed')

module.exports = {
    adminOnly: true,
    name: 'welcome',

    async exec(interaction) {
        const { client, guild } = interaction
        await interaction.deferReply()
        const dbGuild = await client.factory.getGuildById(guild.id) // fetching the guild from the db
        switch (interaction.options.getSubcommand()) {
            case 'set-channel':
                return setChannel(interaction, client, guild, dbGuild)
            case 'set-time':
                return setTime(interaction, client, guild, dbGuild)
            case 'enable':
                return enable(interaction, client, guild, dbGuild)
            case 'disable':
                return disable(interaction, client, guild, dbGuild)
            case 'set-welcome-embed':
                return setWelcomeEmbed(interaction, client, guild)
            case 'test':
                return testWelcomeEmbed(interaction, dbGuild)
            default:
                return 'not implented'
        }
    },

}

