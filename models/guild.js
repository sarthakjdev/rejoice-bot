class Guild {
    constructor(data) {
        this.id = data.guildId
        this.owner = data.guildOwnerId
        this.welcomeChannel = data.welcomeCannelId
    }
}

module.exports = Guild