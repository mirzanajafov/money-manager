const express = require('express');
const auth = require('../middleware/auth')
const incomeController = require('../controllers/income')

const router = new express.Router()

router.post('/incomes', auth, async(req, res) => {
    try {
        res.status(201).send(await incomeController.createIncome(req.body, req.user))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/incomes', auth, async(req, res) => {
    try {
        res.status(200).send(await incomeController.getIncomes(req.user))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/incomes/:id', auth, async(req, res) => {
    try {
        res.status(200).send(await incomeController.deleteIncome(req.user, req.params.id))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/incomes/:id', auth, async(req, res) => {
    try {
        res.status(200).send(await incomeController.updateIncome(req.params.id, req.user, req.body))
    } catch (e) {
        res.status(400).send(e.message)
    }
})


module.exports = router