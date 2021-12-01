module.exports = async (client) => {
    console.log(`==== Bot ready :: ${client.user.username} =====`)
    const setStatus = () => client.user.setActivity(`discord.gg/rejoiceop`, { type: 'WATCHING' })
    setStatus()
}
