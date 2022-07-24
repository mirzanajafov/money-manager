const mongoose = require('mongoose')
const validator =require('validator')

const iconSchema = new mongoose.Schema({
    iconName: {
        type:String,
        required:true
    }
})

const Icon = mongoose.model('Icon', iconSchema)

module.exports = Icon