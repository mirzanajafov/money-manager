const express = require('express');
const auth = require('../middleware/auth')
const categoryController = require('../controllers/category')

const router = new express.Router()

router.post('/categories', auth, async(req, res) => {
    try {
        res.status(201).send(await categoryController.createCategory(req.body, req.user))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/categories', auth, async(req, res) => {
    try {
        res.status(200).send(await categoryController.getCategories(req.user))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/categories/:id', auth, async(req, res) => {
    try {
        res.status(200).send(await categoryController.deleteCategory(req.user, req.params.id))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/categories/:id', auth, async(req, res) => {
    try {
        res.status(200).send(await categoryController.updateCategory(req.params.id, req.user, req.body))
    } catch (e) {
        res.status(400).send(e.message)
    }
})


module.exports = router