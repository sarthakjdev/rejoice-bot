module.exports = async (client, guild) => {
try {
    const dbGuildCreated = await client.factory.createGuild(guild.id , guild.ownerId)
} catch (error) {
    console.log(error)
}
}
