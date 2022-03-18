const Components = require('../../struct/components')

async function enableProfileFeature(interaction, client, guild, dbGuild) {
    const channelToSet = await interaction.options.get('channel').value
    const dbProfileCommandsChannel = dbGuild.ProfileCommandChannel // welcome channel for the guild as per the database
    if (dbProfileCommandsChannel) { // if already a dbGuildChannel => service alredy enabled
        const embed = Components.errorEmbed(`You have already enabled profile service on <#${dbProfileCommandsChannel}>`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setProfileService(guild.id, channelToSet)
    const setupSuccessEmbed = Components.successEmbed(`<@${interaction.user.id}>Congrats! profile service set up done!`)

    return interaction.editReply(setupSuccessEmbed)
}

module.exports = enableProfileFeature
