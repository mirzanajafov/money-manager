const Category = require('../models/category');
const Icon = require('../models/icons');
const Logger = require('../utils/logger');

const getIconId = async(iconName) => {
        let icon = await Icon.findOne({ iconName: iconName }).distinct('_id').exec()

        return icon[0]

    }
    // color  #a39e9e
const insertDefaultCategories = async() => {
    Logger.info(`Default categories inserting start`)

    const categories = [{
            category: 'Transportation',
            icon: await getIconId('directions_bus'),
            type: 'expense',
            color: '#7099f7',
        },
        {
            category: 'Workout',
            icon: await getIconId('fitness_center'),
            type: 'expense',
            color: '#46f57b',
        },
        {
            category: 'Family',
            icon: await getIconId('family_restroom'),
            type: 'expense',
            color: '#ff4a4a',
        },
        {
            category: 'Groceries',
            icon: await getIconId('shopping_cart'),
            type: 'expense',
            color: '#4de0e7',
        },
        {
            category: 'Gifts',
            icon: await getIconId('redeem'),
            type: 'expense',
            color: '#9bdbb4',
        },
        {
            category: 'Education',
            icon: await getIconId('school'),
            type: 'expense',
            color: '#e13fa0',
        },
        {
            category: 'Cafe',
            icon: await getIconId('restaurant'),
            type: 'expense',
            color: '#eaed2f',
        },
        {
            category: 'Home',
            icon: await getIconId('cottage'),
            type: 'expense',
            color: '#2b63e3',
        },
        {
            category: 'Leisure',
            icon: await getIconId('account_balance_wallet'),
            type: 'expense',
            color: '#ff9800',
        },
        {
            category: 'Health',
            icon: await getIconId('monitor_heart'),
            type: 'expense',
            color: '#e91000',
        },
        {
            category: 'Other',
            icon: await getIconId('question_mark'),
            type: 'expense',
            color: '#9c27b0',
        },
        {
            category: 'Gift',
            icon: await getIconId('redeem'),
            type: 'income',
            color: '#9c27b0',
        },
        {
            category: 'Interest',
            icon: await getIconId('account_balance'),
            type: 'income',
            color: '#4caf50',
        },
        {
            category: 'Paycheck',
            icon: await getIconId('monetization_on'),
            type: 'income',
            color: '#009688',
        },
        {
            category: 'Other',
            icon: await getIconId('question_mark'),
            type: 'income',
            color: '#ff9800',
        },
    ]

    for (const category of categories) {
        const count = await Category.countDocuments({ category: category.category })

        count == 0 && await new Category(category).save()
    }
}

module.exports = insertDefaultCategories