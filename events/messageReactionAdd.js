/**
 * messageReactionAdd event of the rejoice discord event, trigerred when a reaction is added to a messsage
 */

const Components = require('../struct/components')

module.exports = async (client, messageReaction) => {
    const guild = await client.guilds.fetch(messageReaction.message.guildId)
    const dbGuild = await client.factory.getGuildById(`${messageReaction.message.guildId}`)

    if (messageReaction.emoji.name === '⭐' && messageReaction.count === dbGuild.reactions) {
        const mediaToBeAttached = []
        if (messageReaction.message.attachments.size !== 0) {
            // eslint-disable-next-line array-callback-return
            messageReaction.message.attachments.map((media) => {
                mediaToBeAttached.push(media)
            })
        }

        const embed = Components.starBoardEmbed(messageReaction.message.content, mediaToBeAttached, guild)

        const channel = await client.channels.fetch(dbGuild.starBoardChannel)

        await channel.send(embed)
    }
}
