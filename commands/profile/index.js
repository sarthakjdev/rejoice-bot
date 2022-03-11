/**
 * profile command of the rejoice bot
 */

const enable = require('./enable')
const disable = require('./disable')
const update = require('./update')
const getProfile = require('./getProfile')
const create = require('./create')

module.exports = {
    name: 'profile',
    async exec(interaction) {
        const { client, guild } = interaction
        await interaction.deferReply()
        const dbGuild = await client.factory.getGuildById(guild.id) // fetching the guild from the db
        switch (interaction.options.getSubcommand()) {
            case 'enable':
                return enable(interaction, client, guild, dbGuild)
            case 'disable':
                return disable(interaction, client, guild, dbGuild)
            case 'create':
                return create(interaction, client, guild, dbGuild)
            case 'update':
                return update(interaction, client, guild, dbGuild)
            case 'get':
                return getProfile(interaction, client, guild, dbGuild)
            default:
                return 'not implented'
        }
    },

}

