/**
 * messageCreate event of the rejoice discord bot trigerred when a new message is created in the guild
 */

const Components = require('../struct/components')

const updatePoints = async (client, guildId, userId, message) => {
    // check if the user exist in the db for that guild or not
    const user = await client.factory.getUser(guildId, userId)
    if (!user) await client.factory.createUser(guildId, userId)

    // get db guild
    const dbGuild = await client.factory.getGuildById(guildId)

    // check if the ranking system is enabled for the guild or not
    const rankingSystemStatus = dbGuild.rankingStatus
    if (!rankingSystemStatus) return
    let existingPoints = 0
    if (user) existingPoints = user.points
    const points = message.content.split('').filter((l) => l !== ' ').length / 100
    const pointsToUpdate = existingPoints + points
    const rank = Math.floor(pointsToUpdate / 1000)
    await client.factory.updatePoints(guildId, userId, pointsToUpdate, rank)
}

const verifyMessageMentions = async (client, guildId, message) => {
    //  user with a particular role tag prevention
    const guild = await client.guilds.fetch(guildId)
    const dbGuild = await client.factory.getGuildById(guild.id)

    // check if vip roles exist for the guild or not
    const dbRoles = dbGuild.vipRoles
    let vipRoles
    if (dbRoles) vipRoles = dbRoles.split(',')
    else return
    const channelId = await message.channel.id
    const channel = await guild.channels.fetch(channelId)
    const messageMentions = message.mentions.users // get the users that are mentioned in the message
    if (!messageMentions.size) return
    const messageMentionsUsers = await Promise.all(await messageMentions.map((mention) => guild.members.fetch(mention.id)))
    const rolesOfUsersMentioned = await messageMentionsUsers.map((user) => user._roles)
    const rolesToCheck = [].concat(...rolesOfUsersMentioned)
    const roleExist = await rolesToCheck.filter(async (r) => {
        await vipRoles.map((role) => role === r)
    })

    if (roleExist.length !== 0) {
        message.delete() // deletes the message if a vip memeber has been tagged in the message
        const embed = Components.errorEmbed('You can not tag a vip member')

        await channel.send({ content: `<@${message.author.id}>`, embeds: [embed] })
    }
}

module.exports = async (client, message) => {
    // retrieving guild and user if from message
    const guildId = await message.guildId
    const userId = await message.author.id

    if (message.author.id === client.application.id) return
    // updating rank if needed :
    updatePoints(client, guildId, userId, message)
    // verifying mentions in the message :
    verifyMessageMentions(client, guildId, message)
}
