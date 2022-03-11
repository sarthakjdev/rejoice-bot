const Components = require('../../struct/components')

// Setting up channel to send the welcome messages when a user joins a guild:
async function setChannel(interaction, client, guild, dbGuild) {
    const channelToSet = await interaction.options.get('channel').value
    const dbStarBoardChannel = dbGuild.starBoardChannel
    if (!dbStarBoardChannel) {
        const embed = Components.errorEmbed('Set up your star-board service first, only  then you can use this command to change or update the star-board channel. \n Thanks!')

        return interaction.editReply({ embeds: [embed] })
    }
    if (channelToSet === dbStarBoardChannel) { // if new channel matches with the old one => same channel can't operate the query
        const embed = Components.errorEmbed(`You have already configured <#${dbStarBoardChannel}> as your star board channel! `)

        return interaction.editReply({ embeds: [embed] })
    }
    await client.factory.setStarBoardService(guild.id, channelToSet, dbGuild.reactions)

    const embed = Components.successEmbed('Successfully updated the star-board service.')

    return interaction.editReply(embed)
}

// setting up time in the db for welcome message being teamporrary
async function setReactions(interaction, client, guild, dbGuild) {
    const dbReactions = dbGuild.reactions

    const reactionsToSet = await interaction.options.get('count').value

    if (!dbGuild.starBoardChannel) {
        const embed = Components.errorEmbed(`You don't have star-board service enabled for your server!`)

        return interaction.editReply({ embeds: [embed] })
    }
    if (dbReactions === reactionsToSet) {
        const embed = Components.errorEmbed(`Minimum reaction for a message being starred is already been set up at ${dbReactions} ! `)

        return interaction.editReply({ embeds: [embed] })
    }

    await client.factory.setStarBoardService(guild.id, dbGuild.starBoardChannel, reactionsToSet, dbGuild.starredEmoji)

    const embed = Components.successEmbed('Successfully updated the reactions!')

    return interaction.editReply(embed)
}

module.exports = {
    setChannel,
    setReactions,
}
