/**
 * vip roles command of the rejoice bot
 */

const configVip = require('./set-config')

module.exports = {
    adminOnly: true,
    name: 'vip',

    async exec(interaction) {
        await interaction.deferReply()
        const { client, guild } = interaction
        const dbGuild = await client.factory.getGuildById(guild.id)

        const actionRole = await interaction.options.get('role')?.value

        switch (interaction.options.getSubcommand()) {
            case 'add-vip':
                return configVip.addVipRole(interaction, client, guild, dbGuild, actionRole)
            case 'remove-vip':
                return configVip.removeVipRole(interaction, client, guild, dbGuild, actionRole)
            case 'get-roles':
                return configVip.getVipRoles(interaction, dbGuild)
            case 'clear':
                return configVip.clearVipRoles(interaction, client, guild, dbGuild)
            default:
                return 'not implemented'
        }
    },

}

