
import dbConnect from '../../../utils/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '../../../models/category.model'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {


    try {
        if (req.method === "GET") {
            const { categoryId } = req.query
            const category = await Category.findById(categoryId)
            if (!category) {
                return res.status(404).json({ message: 'Category not found' })
            }
            return res.status(200).json(category)
        }

    } catch (err) {
        return res.status(500).json({ message: 'Server Error' })
    }

    return res.status(500).json({ message: 'Error Server' })

}

