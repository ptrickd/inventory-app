



import type { NextApiRequest, NextApiResponse } from 'next'
import Category from '../../../models/category.model'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.name) throw new Error('Name can be empty')
    if (req.method === "POST") {
        const category = new Category({
            name: req.body.name
        })
    }
    res.json({ test: 'test' })

}