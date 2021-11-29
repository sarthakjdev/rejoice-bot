module.exports = {
    adminOnly: true,
    name: 'welcome',
    async setChannel(interaction){
        const channelToSet = await interaction.options.get('channel').value
        const { client, guild } = interaction
        await client.factory.setWelcomeChannel(guild.id, channelToSet)

        const welcomeChannel = await guild.channels.fetch(channelToSet)
        await welcomeChannel.send('hello , this channel has been set up as your welcome channel')

        return interaction.editReply('welcome channel set up')
    },
    async exec(interaction) {
        await interaction.deferReply()
        switch (interaction.options.getSubcommand()) {
            case 'set-channel':
                return this.setChannel(interaction)
        }
    }

}