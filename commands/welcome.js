const Components = require('../struct/components')

module.exports = {
    adminOnly: true,
    name: 'welcome',

    // Setting up the initial welcome message service along with tiimer :
    async startWelcome(interaction, client, guild, dbGuild) {
        const channelToSet = await interaction.options.get('channel').value
        const timeSpan = await interaction.options.get('time')?.value
        const dbWelcomeChannel = dbGuild.welcomeChannel // welcome channel for the guild as per the database
        if (dbWelcomeChannel) { // if already a dbGuildChannel => service alredy enabled
            const embed = await Components.errorEmbed(`You have already enabled welcome service on <#${dbWelcomeChannel}>`)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.setWelcomeService(guild.id, channelToSet, timeSpan)

        // fetching the welcome channel and then sending the notifiaction to it.
        const welcomeChannel = await guild.channels.fetch(channelToSet)
        const welcomeChannelSetupEmbed = await Components.successEmbed(`<@${interaction.user.id}> channel has been set up as your welcome channel`)
        await welcomeChannel.send(welcomeChannelSetupEmbed)
        const setupSuccessEmbed = await Components.successEmbed(`<@${interaction.user.id}>Congrats! Welcome service set up done!`)

        return interaction.editReply(setupSuccessEmbed)
    },

    // Setting up channel to send the welcome messages when a user joins a guild:
    async setChannel(interaction, client, guild, dbGuild) {
        const channelToSet = await interaction.options.get('channel').value
        const dbWelcomeChannel = dbGuild.welcomeChannel
        if (!dbWelcomeChannel) {
            const embed = Components.errorEmbed('Set up your welcome service first, only  then yuo can use this command to change or update the welcome channel. \n Thanks!')

            return interaction.editReply({ embeds: [embed] })
        }
        if (channelToSet === dbWelcomeChannel) { // if new channel matches with the old one => same channel can't operate the query
            const embed = Components.errorEmbed(`You have already configured <#${dbWelcomeChannel}> as your welcome channel! `)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.setWelcomeService(guild.id, channelToSet, dbGuild.welcomeTimeGap)
        const welcomeChannel = await guild.channels.fetch(channelToSet)
        await welcomeChannel.send('hello , this channel has been set up as your welcome channel')

        const embed = Components.successEmbed('Successfully updated the welcome service.')

        return interaction.editReply(embed)
    },

    // To stop the welcome messages
    async stopWelcome(interaction, client, guild, dbGuild) {
        const dbWelcomeChannel = dbGuild.welcomeChannel
        if (!dbWelcomeChannel) { // if no welcome channel in db => service not enabled, hence no stoppage
            const embed = Components.errorEmbed(`You don't have welcome service enabled for your server!`)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.setWelcomeService(guild.id, null, null)

        const embed = Components.successEmbed('Successfully stopped the welcome service.')

        return interaction.editReply(embed)
    },

    // setting up time in the db for welcome message being teamporrary
    async setTime(interaction, client, guild, dbGuild) {
        const dbTimeSpan = dbGuild.welcomeTimeGap
        const timeToSet = await interaction.options.get('time').value
        if (dbTimeSpan === timeToSet) {
            const embed = Components.errorEmbed(`Time for disappearing of welcome message is already been set up at ${dbTimeSpan} seconds! `)

            return interaction.editReply({ embeds: [embed] })
        }

        await client.factory.setWelcomeService(guild.id, dbGuild.welcomeChannel, timeToSet)

        const embed = Components.successEmbed('Successfully updated the time!')

        return interaction.editReply(embed)
    },

    // set welcome embed
    async setWelcomeEmbed(interaction, client, guild) {
        const embedColorCode = interaction.options.get('color')?.value
        const embedTitle = interaction.options.get('title')?.value
        const embedDescription = interaction.options.get('description')?.value
        const embedThumbnail = interaction.options.get('thumbnail-link')?.value
        const embedBanner = interaction.options.get('banner-link')?.value

        const embedData = {
            embedColorCode,
            embedTitle,
            embedDescription,
            embedThumbnail,
            embedBanner,
        }

        await client.factory.setWelcomeEmbed(embedData, guild.id)
        const dbGuild = await client.factory.getGuildById(guild.id)

        const sampleEmbed = await Components.welcomeEmbed(dbGuild)
        const embedSetupDone = await Components.successEmbed('Your embed has been successfully set up. \n Test embed is here.')

        interaction.reply({ embeds: [...sampleEmbed.embeds, ...embedSetupDone.embeds] })
    },

    // testing welcome embed
    async testWelcomeEmbed(interaction, dbGuild) {
        const welcomeEmbed = await Components.welcomeEmbed(dbGuild, interaction.user)

        return interaction.editReply(welcomeEmbed)
    },

    async exec(interaction) {
        const { client, guild } = interaction
        await interaction.deferReply()
        const dbGuild = await client.factory.getGuildById(guild.id) // fetching the guild from the db
        switch (interaction.options.getSubcommand()) {
            case 'set-channel':
                return this.setChannel(interaction, client, guild, dbGuild)
            case 'set-time':
                return this.setTime(interaction, client, guild, dbGuild)
            case 'enable':
                return this.startWelcome(interaction, client, guild, dbGuild)
            case 'disable':
                return this.stopWelcome(interaction, client, guild, dbGuild)
            case 'set-welcome-embed':
                return this.setWelcomeEmbed(interaction, client, guild)
            case 'test':
                return this.testWelcomeEmbed(interaction, dbGuild)
            default:
                return 'not implented'
        }
    },

}
