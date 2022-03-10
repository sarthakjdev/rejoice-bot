/**
 * ready event of the rejoice discord bot, trigerred when the application logs in
 */

module.exports = async (client) => {
    // eslint-disable-next-line no-console
    console.log(`==== Bot ready :: ${client.user.username} =====`)
    const setStatus = () => client.user.setActivity(`discord.gg/rejoiceop`, { type: 'WATCHING' })
    setStatus()
}
