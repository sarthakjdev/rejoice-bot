module.exports = async (client, member) => {
try {
    const guildMember = await member.fetch()
    const welcomeChannelId = await client.factory.getWelcomeChannel(guildMember.guild.id)
    const guild = await client.guilds.fetch(guildMember.guild.id)
    const welcomeChannel = await guild.channels.fetch(welcomeChannelId)
    if(welcomeChannel) await welcomeChannel.send('Thank for joining the server')
    else return
} catch (error) {
    console.log(error);
}
}
