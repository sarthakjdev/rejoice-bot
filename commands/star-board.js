const Components = require('../struct/components')

module.exports = {
    adminOnly: true,
    name: 'star-board',

    // Setting up the initial welcome message service along with tiimer :
    async startStarBoard(interaction, client, guild, dbGuild) {
        const channelToSet = await interaction.options.get('channel').value
        const numberOfReactions = await interaction.options.get('reactions')?.value
        const { dbStarBoardChannel } = dbGuild // starred channel for the guild as per the database
        if (dbStarBoardChannel) { // if already a dbGuildChannel => service alredy enabled
            const embed = Components.errorEmbed(`You have already enabled star board service on <#${dbStarBoardChannel}>`)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.setStarBoardService(guild.id, channelToSet, numberOfReactions)
        const setupSuccessEmbed = Components.successEmbed(`<@${interaction.user.id}>Congrats! Star board set up has been done!`)

        return interaction.editReply(setupSuccessEmbed)
    },

    // Setting up channel to send the welcome messages when a user joins a guild:
    async setChannel(interaction, client, guild, dbGuild) {
        const channelToSet = await interaction.options.get('channel').value
        const dbStarBoardChannel = dbGuild.starBoardChannel
        if (!dbStarBoardChannel) {
            const embed = Components.errorEmbed('Set up your star-board service first, only  then you can use this command to change or update the star-board channel. \n Thanks!')

            return interaction.editReply({ embeds: [embed] })
        }
        if (channelToSet === dbStarBoardChannel) { // if new channel matches with the old one => same channel can't operate the query
            const embed = Components.errorEmbed(`You have already configured <#${dbStarBoardChannel}> as your star board channel! `)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.setStarBoardService(guild.id, channelToSet, dbGuild.reactions)

        const embed = Components.successEmbed('Successfully updated the star-board service.')

        return interaction.editReply(embed)
    },

    // To stop the welcome messages
    async stopStarBoard(interaction, client, guild, dbGuild) {
        const dbStarBoardChannel = dbGuild.starBoardChannel
        if (!dbStarBoardChannel) { // if no welcome channel in db => service not enabled, hence no stoppage
            const embed = Components.errorEmbed(`You don't have star-board service enabled for your server!`)

            return interaction.editReply({ embeds: [embed] })
        }
        await client.factory.setStarBoardService(guild.id, null, null)

        const embed = Components.successEmbed('Successfully stopped the star-board service.')

        return interaction.editReply(embed)
    },

    // setting up time in the db for welcome message being teamporrary
    async setReactions(interaction, client, guild, dbGuild) {
        const dbReactions = dbGuild.reactions

        const reactionsToSet = await interaction.options.get('count').value

        if (!dbGuild.starBoardChannel) {
            const embed = Components.errorEmbed(`You don't have star-board service enabled for your server!`)

            return interaction.editReply({ embeds: [embed] })
        }
        if (dbReactions === reactionsToSet) {
            const embed = Components.errorEmbed(`Minimum reaction for a message being starred is already been set up at ${dbReactions} ! `)

            return interaction.editReply({ embeds: [embed] })
        }

        await client.factory.setStarBoardService(guild.id, dbGuild.starBoardChannel, reactionsToSet, dbGuild.starredEmoji)

        const embed = Components.successEmbed('Successfully updated the reactions!')

        return interaction.editReply(embed)
    },

    async setReactionEmoji(interaction, client, guild, dbGuild) {
        const dbEmoji = dbGuild.starredEmoji

        const emojiToSet = await interaction.options.get('emoji-id').value

        if (dbEmoji) {
            const embed = Components.errorEmbed(`You don't have star-board service enabled for your server!`)

            return interaction.editReply({ embeds: [embed] })
        }
        if (dbEmoji === emojiToSet) {
            const embed = Components.errorEmbed(`The starred emoji is already set up at ${dbEmoji} ! `)

            return interaction.editReply({ embeds: [embed] })
        }

        await client.factory.setStarBoardService(guild.id, dbGuild.starBoardChannel, dbGuild.reactions)

        const embed = Components.successEmbed('Successfully updated the starred emoji!')

        return interaction.editReply(embed)
    },

    async exec(interaction) {
        const { client, guild } = interaction
        await interaction.deferReply()
        const dbGuild = await client.factory.getGuildById(guild.id) // fetching the guild from the db
        switch (interaction.options.getSubcommand()) {
            case 'set-channel':
                return this.setChannel(interaction, client, guild, dbGuild)
            case 'set-reactions':
                return this.setReactions(interaction, client, guild, dbGuild)
            case 'enable':
                return this.startStarBoard(interaction, client, guild, dbGuild)
            case 'disable':
                return this.stopStarBoard(interaction, client, guild, dbGuild)
            case 'set-emoji':
                return this.setReactionEmoji(interaction, client, guild, dbGuild)
            case 'set-embed':
                return this.setStarBoardEmbed(interaction, client, guild)
            default:
                return 'not implented'
        }
    },

}
