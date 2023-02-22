const express = require('express');
const auth = require('../middleware/auth');
const dateformat = require('dateformat');
const expenseController = require('../controllers/expense');

const router = new express.Router();

router.post('/expenses', auth, async (req, res) => {
  try {
    console.log('test');
    res
      .status(201)
      .send(await expenseController.createExpense(req.body, req.user));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/expenses', auth, async (req, res) => {
  try {
    let expenses = await expenseController.getExpenses(req.user);
    expenses = expenses.map(function (expense) {
      // console.log(expense)
      expense.createdAt = dateformat(expense.createdAt, 'd mmmm yyyy');
      return expense;
    });
    res.status(200).json(expenses);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete('/expenses/:id', auth, async (req, res) => {
  try {
    res
      .status(200)
      .send(await expenseController.deleteExpense(req.user, req.params.id));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch('/expenses/:id', auth, async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await expenseController.updateExpense(req.params.id, req.user, req.body)
      );
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
