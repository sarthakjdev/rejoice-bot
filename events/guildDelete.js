/**
 * guildDelete event of the rejoicce discord bot, trigerred when the application leaves a guild
 */

// eslint-disable-next-line consistent-return
module.exports = async (client, guild) => {
    try {
        await client.factory.deleteGuild(guild.id)
    } catch (error) {
        return undefined
    }
}

