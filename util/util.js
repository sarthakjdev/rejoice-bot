const { MessageEmbed } = require('discord.js')

class Util {
    static embed() {
        return new MessageEmbed().setColor('#ff2d38')
    }

    static errorPrint(error, extra = {}) {
        let err = `${'=== Begin Error ===\n---\n'
        + 'Error: '}${error.message}\n`
        const extraArray = Object.keys(extra).map((e) => `${e} : ${extra[e]}`).join('\n')
        err += extraArray
        err += `\nStack: ${error.stack}\n---\n=== End Error ===`

        // eslint-disable-next-line no-console
        console.error(err)
    }
}

module.exports = Util
