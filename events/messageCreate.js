module.exports = async (client, message)=> {
// retrineving guild and user if from message
 const guildId = await message.guildId
 const userId = await message.author.id

// updating rank if needed : 
updatePoints(client, guildId, userId, message)

// verifying mentions in the message : 
verifyMessageMentions(client, guildId, message)
}

const updatePoints = async(client,guildId, userId, message )=>{
     // check if the user exist in the db for that guild or not
     const user = await client.factory.getUser(guildId, userId)
     if(!user) await client.factory.createUser(guildId, userId)

     // get db guild 
     const dbGuild = await client.factory.getGuildById(guildId)

     // check if the ranking system is enabled for the guild or not
     const rankingSystemStatus = dbGuild.rankingStatus
     if(!rankingSystemStatus) return
     let existingPoints
     if(user) existingPoints = user.points
     else existingPoints = 0
     const points = message.content.split('').filter((l)=> l != ' ').length / 100
     const pointsToUpdate = existingPoints + points
     await client.factory.updatePoints(guildId, userId, pointsToUpdate)
}


const verifyMessageMentions = async(client, guildId, message)=>{
    //  user with a particular role tag prevention
    console.log('message mention function')
    const guild = await client.guilds.fetch(guildId)
    const dbGuild = await client.factory.getGuildById(guild.id)
    const vipRoles = dbGuild.vipRoles.split(',')
    const channelId = await message.channel.id
    const channel = await guild.channels.fetch(channelId)
    const messageMentions = message.mentions.users  // get the users that are mentioned in the message
    const messageMentionsUsers = await Promise.all( await messageMentions.map((mention)=>  guild.members.fetch(mention.id)))
    const rolesOfUsersMentioned = messageMentionsUsers.map((user)=> user._roles)
    console.log("rolesOfUsersMentioned ", rolesOfUsersMentioned);
    // const mentionedRoleIds = rolesOfUsersMentioned.map((role)=> role.member._roles)
    // console.log("mentionedRoleIds ", mentionedRoleIds);
    
    
    // await vipRoles.map((v)=>rolesOfUsersMentioned)
    
}