
module.exports = async (client, member) => {
    try {
        const guildMember = await member.fetch()
        await client.factory.removeUser(guildMember.guild.id, guildMember.id)
    } catch (error) {
        console.log(error)
    }
}
