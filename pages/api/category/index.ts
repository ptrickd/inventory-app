
import dbConnect from '../../../utils/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '../../../models/category.model'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.name) return res.status(400).json({ message: 'Name required' })
    console.log('888888888888888888888', req.method)
    try {
        if (req.method === "POST") {
            let category = new Category({
                name: req.body.name
            })

            category = await category.save()
            return res.status(200).json(category)
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server Error' })
    }
    return res.status(200).json({ message: 'Went trouh' })
    return res.status(500).json({ message: 'Error Server' })

}

