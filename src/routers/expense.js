const express = require('express');
const auth = require('../middleware/auth')
const expenseController = require('../controllers/expense')

const router = new express.Router()

router.post('/expenses', auth, async(req, res) => {
    try {
        res.status(201).send(await expenseController.createExpense(req.body, req.user))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/expenses', auth, async(req, res) => {
    try {
        res.status(200).send(await expenseController.getExpenses(req.user))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/expenses/:id', auth, async(req, res) => {
    try {
        res.status(200).send(await expenseController.deleteExpense(req.user, req.params.id))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/expenses/:id', auth, async(req, res) => {
    try {
        res.status(200).send(await expenseController.updateExpense(req.params.id, req.user, req.body))
    } catch (e) {
        res.status(400).send(e.message)
    }
})


module.exports = router