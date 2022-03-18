/**
 * bug reporting command of the rejoice bot
 */

const Components = require('../../struct/components')

module.exports = {
    name: 'report-bug',
    exec: async (interaction) => {
        const { client } = interaction
        await interaction.deferReply()

        const descriptionOFBug = await interaction.options.get('description').value

        const bugReportGuild = await client.guilds.fetch(interaction.guildId)
        const reportChannl = await bugReportGuild.channels.fetch(interaction.channelId)
        const inviteToReportingGuild = await reportChannl.createInvite()

        const guild = await client.guilds.fetch(process.env.HOME_GUILD_ID)
        const channelToSend = await guild.channels.fetch(process.env.HOME_ADMIN_CHANNEL_ID)

        const embed = Components.bugEmbed(descriptionOFBug, bugReportGuild, inviteToReportingGuild)
        await channelToSend.send(embed)

        const successEmbed = Components.successEmbed('Thanks for your contribution. Bug has been reported')

        return interaction.editReply(successEmbed)
    },
}

