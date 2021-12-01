const Components = require("../struct/components")

module.exports = {
    name: 'ping',
    exec: async(interaction) => {
        const { client } = interaction
        await interaction.deferReply()
        
        const embed = Components.successEmbed(`Ping Pong Pung :${client.ws.ping}ms `)
        await interaction.editReply(embed)
    }
}