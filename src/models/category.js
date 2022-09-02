const mongoose = require('mongoose')
const validator = require('validator')

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    icon: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Icons'
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }

}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category