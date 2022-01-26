const Components = require('../struct/components')

module.exports = async (client, messageReaction) => {
    const dbGuild = await client.factory.getGuildById(`${messageReaction.message.guildId}`)
    if (messageReaction.emoji.name === '⭐' && messageReaction.count === dbGuild.reactions) {
        const embed = Components.starBoardEmbed(messageReaction.message.content)

        const channel = await client.channels.fetch(messageReaction.message.channelId)

        await channel.send(embed)
    }
}
