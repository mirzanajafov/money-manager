const mongoose = require('mongoose')
const validator =require('validator')

const categorySchema = new mongoose.Schema({
    category: {
        type:String,
        required:true
    },
    icon_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Icons'
    },
    color: {
        type: String,
        required:true
    }
    
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category