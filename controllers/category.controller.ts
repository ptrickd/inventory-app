import dbConnect from '../utils/dbConnect'
import { Category } from '../models/category.model'

dbConnect()

export const createCategory = async (name: string) => {
    const category = await Category.create({ name })
    return category
}

export const getCategories = async () => {
    const categories = await Category.find({})
    return categories
}

export const getCategory = async (categoryId: string) => {

    let category = await Category.findById(categoryId)
    return category
}

export const editCategory = async (categoryId: string, name: string) => {

    let category = await Category.findById(categoryId)
    category.name = name
    category = await category.save()
    return category
}