const Components = require('../../struct/components')

// Setting up the initial welcome message service along with tiimer :
async function startWelcome(interaction, client, guild, dbGuild) {
    const channelToSet = await interaction.options.get('channel').value
    const timeSpan = await interaction.options.get('time')?.value
    const dbWelcomeChannel = dbGuild.welcomeChannel // welcome channel for the guild as per the database
    if (dbWelcomeChannel) { // if already a dbGuildChannel => service alredy enabled
        const embed = Components.errorEmbed(`You have already enabled welcome service on <#${dbWelcomeChannel}>`)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setWelcomeService(guild.id, channelToSet, timeSpan)

    // fetching the welcome channel and then sending the notifiaction to it.
    const welcomeChannel = await guild.channels.fetch(channelToSet)
    const welcomeChannelSetupEmbed = Components.successEmbed(`<@${interaction.user.id}> channel has been set up as your welcome channel`)
    await welcomeChannel.send(welcomeChannelSetupEmbed)
    const setupSuccessEmbed = Components.successEmbed(`<@${interaction.user.id}>Congrats! Welcome service set up done!`)

    return interaction.editReply(setupSuccessEmbed)
}

module.exports = startWelcome
