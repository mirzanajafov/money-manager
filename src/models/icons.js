const mongoose = require('mongoose')
const validator = require('validator')

const iconSchema = new mongoose.Schema({
    iconName: {
        type: String,
        required: true
    }
})

const Icon = mongoose.model('Icons', iconSchema)

module.exports = Icon