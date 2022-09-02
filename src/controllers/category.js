const Category = require('../models/category')
const utils = require('../utils/utils')

const createCategory = async(body, user) => {

    const category = new Category({
        ...body,
        user: user._id
    });

    await category.save();
    return category

}

const getCategories = async(user) => {
    const categories = await Category.find({ $or: [{ 'user': null }, { 'user': user._id }] }).populate('icon').populate('user')

    return categories
}

const deleteCategory = async(user, cat_id) => {
    const category = await Category.findOneAndDelete({ user: user._id, _id: cat_id })

    if (!category) {
        throw new Error('Category is not found!')
    }

    return category
}

const updateCategory = async(id, user, body) => {
    const updates = utils.checkUpdateFields(body, ['category', 'icon', 'type', 'color'])

    const category = await Category.findOne({ user: user._id, _id: id })

    if (!category) {
        throw new Error('Category is not found!')
    }




    updates.forEach((update) => category[update] = body[update])


    await category.save()

    return category
}

module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory
}