module.exports = {
    name: 'ping',
    exec: async(interaction) => {
        const { client } = interaction
        await interaction.deferReply()
 
        await interaction.editReply(`Ping Pong Pung :${client.ws.ping}ms `)
    }
}