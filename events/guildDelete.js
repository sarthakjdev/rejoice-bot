module.exports = async (client, guild) => {
    try {
       await client.factory.deleteGuild(guild.id)
    } catch (error) {
        console.log(error)
    }
    }
    