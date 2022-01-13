const Components = require('../struct/components')

module.exports = async (client, member) => {
    try {
        const guildMember = await member.fetch()
        await client.factory.createUser(guildMember.guild.id, guildMember.id)
        const dbGuild = await client.factory.getGuildById(guildMember.guild.id)
        const welcomeChannelId = dbGuild.welcomeChannel
        const time = dbGuild.welcomeTimeGap
        const guild = await client.guilds.fetch(guildMember.guild.id)
        const welcomeChannel = await guild.channels.fetch(welcomeChannelId)
        if (welcomeChannel) {
            const embed = Components.welcomeEmbed(dbGuild, guildMember)
            const welcomeMessage = await welcomeChannel.send(embed)
            if (time) {
                setTimeout(() => {
                    welcomeMessage.delete()
                }, time * 1000)
            }
        } else return
    } catch (error) {
        console.log(error)
    }
}
