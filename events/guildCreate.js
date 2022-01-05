module.exports = async (client, guild) => {
    try {
        await client.factory.createGuild(guild.id, guild.ownerId)
    } catch (error) {
        return undefined
    }
}
