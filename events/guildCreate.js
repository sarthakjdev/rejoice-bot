module.exports = async (client, guild) => {
    try {
        const dbGuild = await client.factory.createGuild(guild.id, guild.ownerId)

        return dbGuild
    } catch (error) {
        return undefined
    }
}
