const Income = require('../models/income')
const utils = require('../utils/utils')

const createIncome = async(body, user) => {

    const income = new Income({
        ...body,
        user: user._id
    });

    await income.save();
    return income

}

const getIncomes = async(user) => {
    const incomes = await Income.find({ user: user._id }).populate({
        path: 'category',
        populate: { path: 'icon' }
    })


    return incomes
}

const deleteIncome = async(user, inc_id) => {
    const income = await Income.findOneAndDelete({ user: user._id, _id: inc_id })

    if (!income) {
        throw new Error('Income is not found!')
    }

    return income
}

const updateIncome = async(id, user, body) => {
    const updates = utils.checkUpdateFields(body, ['category', 'fee'])

    const income = await Income.findOne({ user: user._id, _id: id })

    if (!income) {
        throw new Error('Income is not found!')
    }




    updates.forEach((update) => income[update] = body[update])


    await income.save()

    return income
}

module.exports = {
    createIncome,
    getIncomes,
    deleteIncome,
    updateIncome
}