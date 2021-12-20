class Guild {
    constructor(data) {
        this.id = data.guildId
        this.owner = data.guildOwnerId
        this.welcomeChannel = data.welcomeChannelId
        this.joinedAt = data.joinedAt
        this.welcomeTimeGap = data.wTimeSpan
        this.rankingStatus = data.rankingStatus
        this.vipRoles = data.vipRoles
    }
}

module.exports = Guild