module.exports = {
    adminOnly: true,
    name: 'test',
    async exec(interaction) {
        await interaction.deferReply()
        console.log(interaction.guild.id)
        const welcomeChannelId = await interaction.client.factory.getWelcomeChannel(interaction.guild.id)

        await interaction.editReply(`${welcomeChannelId}`)
    }

}