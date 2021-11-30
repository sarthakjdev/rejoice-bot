module.exports = {
    adminOnly: true,
    name: 'test',
    async exec(interaction) {
        await interaction.deferReply()
        await interaction.editReply(`check console, testinig completed.`)
    }

}