const express = require('express');
const auth = require('../middleware/auth')
const utils = require('../utils/utils')


const router = new express.Router()

router.get('/', auth, async(req, res) => {

    const TotalBalance = await utils.TotalBalance(req.user._id)

    res.render('index', { user: req.user, TotalBalance })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/registration', (req, res) => {
    res.render('registration')
})

router.get('*', function(req, res) {
    res.render('404')
});

module.exports = router