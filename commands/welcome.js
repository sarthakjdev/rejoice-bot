const Components = require('../struct/components')

module.exports = {
    adminOnly: true,
    name: 'welcome',

    // Setting up the initial welcome message service along with tiimer : 
    async startWelcome(interaction, client, guild) {
        const channelToSet = await interaction.options.get('channel').value
        // const timeSpan = await interaction.otpions.get('time').value
        const dbWelcomeChannel = await client.factory.getWelcomeChannel(guild.id)
        if(dbWelcomeChannel) 
        {
            const embed = await Components.errorEmbed(`You have already enabled welcome service on <#${dbWelcomeChannel}>`)
            return await interaction.editReply(embed)
        } 
        await client.factory.setWelcomeChannel(guild.id, channelToSet)

        const welcomeChannel = await guild.channels.fetch(channelToSet)
        const welcomeChannelSetupEmbed = await Components.successEmbed(`<@${interaction.user.id}> channel has been set up as your welcome channel`)
        const message = await welcomeChannel.send(welcomeChannelSetupEmbed)

        const setupSuccessEmbed = await Components.successEmbed(`<@${interaction.user.id}>Congrats! Welcome service set up done!`)
        return interaction.editReply(setupSuccessEmbed)

       },

    // Setting up channel to send the welcome messages when a user joins a guild: 
    async setChannel(interaction,client, guild){
        const channelToSet = await interaction.options.get('channel').value
        await client.factory.setWelcomeChannel(guild.id, channelToSet)
        const welcomeChannel = await guild.channels.fetch(channelToSet)
        await welcomeChannel.send('hello , this channel has been set up as your welcome channel')

        return interaction.editReply('welcome channel set up')
    },

    // To stop the welcome messages 
    async stopWelcome(interaction, client, guild){
        await client.factory.setWelcomeChannel(guild.id, null)

        return interaction.editReply('Your welcome service hs been stopped')
    },

    async exec(interaction) {
        const { client, guild } = interaction
        await interaction.deferReply()
        switch (interaction.options.getSubcommand()) {
            case 'set-channel':
                return this.setChannel(interaction,client, guild )
            case 'start':
                return this.startWelcome(interaction,client, guild)
            case 'stop':
                return this.stopWelcome(interaction,client, guild)
        }
    }

}