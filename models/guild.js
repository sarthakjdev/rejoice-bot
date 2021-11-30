class Guild {
    constructor(data) {
        this.id = data.guildId
        this.owner = data.guildOwnerId
        this.welcomeChannel = data.welcomeChannelId
    }
}

module.exports = Guild