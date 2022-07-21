const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const Expense = require('./expense')
const Income = require('./income')
const Category = require('./category')

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: false,
        trim: true
    },
    LastName: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(email){
            if(! validator.isEmail(email)) {
                throw new Error('Email is invalids')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlength:[6, 'Must be larger than 6 characters'],
        validate(pw) {
            if(pw.toLowerCase().includes('password')){
                throw new Error('Password cannot be equal password')
            }
        }
    },
    tokens: [
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
},{
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() } , process.env.JWT_SECRET)


    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login. User not found!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before save

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user info when user is removed

userSchema.pre('remove', async function (next) {
    const user = this

    await Income.deleteMany({owner: user._id})
    await Category.deleteMany({owner: user._id})
    await Expense.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User