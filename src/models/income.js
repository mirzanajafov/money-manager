const mongoose = require('mongoose')
const validator = require('validator')

const incomeSchema = new mongoose.Schema({
    fee: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, {
    timestamps: true
})

const Income = mongoose.model('Income', incomeSchema)

module.exports = Income