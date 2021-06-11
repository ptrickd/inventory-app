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