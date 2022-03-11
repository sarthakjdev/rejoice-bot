class Guild {
    constructor(data) {
        this.id = data.guildId
        this.owner = data.guildOwnerId
        this.welcomeChannel = data.welcomeChannelId
        this.joinedAt = data.joinedAt
        this.welcomeTimeGap = data.wTimeSpan
        this.rankingStatus = data.rankingStatus
        this.vipRoles = data.vipRoles
        this.starBoardChannel = data.starBoardChannelId
        this.reactions = data.noOfReactions
        this.embedColor = data.embedColorCode
        this.embedDescription = data.embedDescription
        this.embedTitle = data.embedTitle
        this.embedThumbnail = data.embedThumbnail
        this.embedBnner = data.embedBanner
        this.profileCommandsChannel = data.profileCommandsChannel
    }
}

module.exports = Guild
