const Expense = require('../models/expense')
const Income = require('../models/income')

const checkUpdateFields = (body, allowedUpdates) => {
    const updates = Object.keys(body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        throw new Error('Invalid Updates')
    }

    return updates
}


const TotalExpense = async(user) => {
    const total = await Expense.aggregate([{
            "$match": {
                user: user
            }
        },
        {
            $group: {
                _id: "$user",
                total: { $sum: "$fee" }
            }
        }
    ])

    return total[0].total
}

const TotalIncome = async(user) => {
    const total = await Income.aggregate([{
            "$match": {
                user: user
            }
        },
        {
            $group: {
                _id: "$user",
                total: { $sum: "$fee" }
            }
        }
    ])

    return total[0].total
}

const TotalBalance = async(user) => {
    const totalExpense = await TotalExpense(user)
    const totalIncome = await TotalIncome(user)
    const balance = totalIncome - totalExpense

    return {
        totalExpense,
        totalIncome,
        balance
    }
}

module.exports = {
    checkUpdateFields,
    TotalBalance

}