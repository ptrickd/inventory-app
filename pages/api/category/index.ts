
import dbConnect from '../../../utils/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '../../../models/category.model'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {


    try {
        if (req.method === "POST") {
            if (!req.body.name) return res.status(400).json({ message: 'Name required' })

            let category = new Category({
                name: req.body.name
            })

            category = await category.save()
            return res.status(200).json(category)
        }
        if (req.method === "GET") {
            let category = await Category.find({})
            return res.status(200).json(category)
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server Error' })
    }

    return res.status(500).json({ message: 'Error Server' })

}

