class UserProfile {
    constructor(data) {
        this.id = data.userId
        this.name = data.name
        this.description = data.description
        this.twitter = data.twitter
        this.linkedin = data.linkedin
        this.instagram = data.instagram
        this.github = data.github
    }
}

module.exports = UserProfile
