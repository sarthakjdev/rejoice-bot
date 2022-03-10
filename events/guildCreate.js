/**
 * guildCreate event of the rejoice discord bot triggered when application is added to a new guild
 */

module.exports = async (client, guild) => {
    try {
        const dbGuild = await client.factory.createGuild(guild.id, guild.ownerId)

        return dbGuild
    } catch (error) {
        return undefined
    }
}
