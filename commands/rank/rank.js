const Components = require('../../struct/components')

async function getRank(interaction, client, guild) {
    const user = await interaction.options.get('user')?.value
    const userToFetch = user || interaction.user.id
    const dbUser = await client.factory.getUser(guild.id, userToFetch)

    const embed = Components.rankEmbed(dbUser, guild)

    return interaction.editReply(embed)
}

async function updateRank(interaction, client, guild) {
    const userToUpdate = await interaction.options.get('user').value
    const updatedRank = await interaction.options.get('rank').value

    const pointsToUpdate = updatedRank * 2000

    await client.factory.updatePoints(guild.id, userToUpdate, pointsToUpdate, updatedRank)
    const dbUser = await client.factory.getUser(guild.id, userToUpdate)

    const embed = Components.rankEmbed(dbUser, guild)
    await interaction.channel.send(embed)
    const successEmbed = Components.successEmbed('Successfully updated the users rank')

    return interaction.editReply({ content: `<@${userToUpdate}>`, ...successEmbed })
}

module.exports = {
    getRank,
    updateRank,
}
