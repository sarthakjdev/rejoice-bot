
const Components = require('../../struct/components')

// Setting up channel to send the welcome messages when a user joins a guild:
async function setChannel(interaction, client, guild, dbGuild) {
    const channelToSet = await interaction.options.get('channel').value
    const dbWelcomeChannel = dbGuild.welcomeChannel
    if (!dbWelcomeChannel) {
        const embed = Components.errorEmbed('Set up your welcome service first, only  then yuo can use this command to change or update the welcome channel. \n Thanks!')

        return interaction.editReply({ embeds: [embed] })
    }
    if (channelToSet === dbWelcomeChannel) { // if new channel matches with the old one => same channel can't operate the query
        const embed = Components.errorEmbed(`You have already configured <#${dbWelcomeChannel}> as your welcome channel! `)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setWelcomeService(guild.id, channelToSet, dbGuild.welcomeTimeGap)
    const welcomeChannel = await guild.channels.fetch(channelToSet)
    await welcomeChannel.send('hello , this channel has been set up as your welcome channel')

    const embed = Components.successEmbed('Successfully updated the welcome service.')

    return interaction.editReply(embed)
}

// setting up time in the db for welcome message being teamporrary
async function setTime(interaction, client, guild, dbGuild) {
    const dbTimeSpan = dbGuild.welcomeTimeGap
    const timeToSet = await interaction.options.get('time').value
    if (dbTimeSpan === timeToSet) {
        const embed = Components.errorEmbed(`Time for disappearing of welcome message is already been set up at ${dbTimeSpan} seconds! `)

        return interaction.editReply({ embeds: [embed] })
    }

    await client.factory.setWelcomeService(guild.id, dbGuild.welcomeChannel, timeToSet)

    const embed = Components.successEmbed('Successfully updated the time!')

    return interaction.editReply(embed)
}

module.exports = { setChannel, setTime }
