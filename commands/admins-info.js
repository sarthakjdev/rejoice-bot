const Components = require('../struct/components')

module.exports = {
    name: 'admin-info',
    exec: async(interaction) => {
        const { client } = interaction
        await interaction.deferReply()
        
        const guild = await client.guilds.fetch(process.env.HOME_GUILD_ID)
        const owner = await guild.members.fetch(guild.ownerId)
        
        const adminInfoComponent = await Components.ownerInfo(owner)
        await interaction.editReply(adminInfoComponent)
    }
}