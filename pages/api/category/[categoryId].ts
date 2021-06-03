
import dbConnect from '../../../utils/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '../../../models/category.model'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {


    try {
        const { categoryId } = req.query
        let category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }

        if (req.method === "GET") {

            return res.status(200).json(category)

        } else if (req.method === "PATCH") {
            if (!req.body.name) return res.status(400).json({ message: "Needs a name" })

            category.name = req.body.name
            category = await category.save()
            return res.status(200).json(category)

        }

    } catch (err) {
        return res.status(500).json({ message: 'Server Error' })
    }

    return res.status(500).json({ message: 'Error Server' })

}

