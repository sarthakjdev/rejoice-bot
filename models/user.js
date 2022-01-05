class User {
    constructor(data) {
        this.id = data.userId
        this.guildId = data.guildId
        this.points = data.points
    }
}

module.exports = User
