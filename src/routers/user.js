const express = require('express');
const auth = require('../middleware/auth')
const UserController = require('../controllers/user')

const router = new express.Router()

router.post('/users', async(req, res) => {

    try {
        const user = await UserController.createUser(req.body)

        req.session.user = user.user
        req.session.userToken = user.token
        res.status(201).send({
            msg: 'success',
            error: false,
        })
    } catch (e) {
        res.status(400).send({
            error: true,
            msg: e.message
        })
    }
})

router.post('/users/login', async(req, res) => {
    try {

        const user = await UserController.login(req.body.email, req.body.password)
        req.session.user = user.user
        req.session.userToken = user.token

        res.status(200).send({
            msg: 'success',
            error: false,
        })
    } catch (e) {
        res.status(400).send({
            error: true,
            msg: e.message
        })
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try {
        await UserController.logout(req.user, req.token)
        req.session.destroy()
        res.status(200).send('Logout successfully')
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        await UserController.logoutAll(req.user)
        res.send()
    } catch (error) {
        res.status(500).send({ error: 'Something wrong!' })
    }
})

router.get('/users/profile', auth, async(req, res) => {
    res.send(await UserController.getUserProfile(req.user))
})

router.patch('/users', auth, async(req, res) => {
    try {
        await UserController.updateUserProfile(req.user, req.body)
        res.send(req.user)
    } catch (e) {
        res.status(400).send({
            error: true,
            msg: e.message
        })
    }
})

router.patch('/users/password', auth, async(req, res) => {
    try {
        await UserController.updateUserPassword(req.user, req.body)
        res.send(req.user)
    } catch (e) {
        res.status(400).send({
            error: true,
            msg: e.message
        })
    }
})

router.delete('/users', auth, async(req, res) => {
    try {
        await UserController.removeUser(req.user)
        res.send('Successfully Removed')
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router