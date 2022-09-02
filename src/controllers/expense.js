const Expense = require('../models/expense')
const utils = require('../utils/utils')

const createExpense = async(body, user) => {

    const expense = new Expense({
        ...body,
        user: user._id
    });

    await expense.save();
    return expense

}

const getExpenses = async(user) => {
    const expenses = await Expense.find({ user: user._id }).populate({
        path: 'category',
        populate: { path: 'icon' }
    })

    return expenses
}

const deleteExpense = async(user, exp_id) => {
    const expense = await Expense.findOneAndDelete({ user: user._id, _id: exp_id })

    if (!expense) {
        throw new Error('Expense is not found!')
    }

    return expense
}

const updateExpense = async(id, user, body) => {
    const updates = utils.checkUpdateFields(body, ['category', 'fee'])

    const expense = await Expense.findOne({ user: user._id, _id: id })

    if (!expense) {
        throw new Error('Expense is not found!')
    }




    updates.forEach((update) => expense[update] = body[update])


    await expense.save()

    return expense
}

module.exports = {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense
}