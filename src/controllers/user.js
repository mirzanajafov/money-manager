const User = require('../models/user');
const { sendWelcomeEmail } = require('../emails/account');
const utils = require('../utils/utils')
const bcrypt = require('bcryptjs');

const createUser = async(body) => {

    const user = new User(body)

    await user.save()
    const token = await user.generateAuthToken()
    sendWelcomeEmail(user.email, user.FirstName + ' ' + user.LastName)

    return { user, token }

}

const login = async(email, password) => {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    return { user, token }
}

const logout = async(user, token) => {
    user.tokens = user.tokens.filter((userToken) => {
        return userToken.token !== token
    })

    await user.save()
}

const logoutAll = async(user) => {
    user.tokens = []
    await user.save()
}

const getUserProfile = async(user) => {
    const Profile = await user

    return Profile
}

const updateUserProfile = async(user, body) => {
    const updates = utils.checkUpdateFields(body, ['FirstName', 'LastName', 'email'])

    updates.forEach((update) => user[update] = body[update])
    await user.save()

    return user
}

const updateUserPassword = async(user, body) => {
    const isMatch = await bcrypt.compare(body.oldPass, user.password)

    if (!isMatch) {
        throw new Error('Ex Password is wrong')
    }

    user.password = body.password

    await user.save()

    return user
}

const removeUser = async(user) => {
    await user.remove()
}

module.exports = {
    createUser,
    login,
    logout,
    logoutAll,
    getUserProfile,
    updateUserProfile,
    removeUser,
    updateUserPassword
}