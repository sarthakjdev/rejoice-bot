/**
 * server information command of the rejoice bot
 */

const Components = require('../../struct/components')

module.exports = {
    name: 'server-info',
    exec: async (interaction) => {
        const { client } = interaction
        await interaction.deferReply()

        const guild = await client.guilds.fetch(interaction.guildId)
        const owner = await guild.members.fetch(guild.ownerId)

        const serverInfoComponent = Components.serverInfo(guild, owner)
        await interaction.editReply(serverInfoComponent)
    },
}

