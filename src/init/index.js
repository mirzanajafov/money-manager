const icon = require('./icons')
const category = require('./category')

const Logger = require('../utils/logger')

const init = async() => {
    Logger.info(`The Initialization begins`)

    try {
        await icon()
        Logger.info(`Icons inserted successfully!`)
        await category()
        Logger.info('Categories inserted successfully!')
    } catch (e) {
        Logger.error(`Something wrong! ${e.message}`)
    }
}


module.exports = init