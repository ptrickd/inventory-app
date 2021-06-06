
import dbConnect from '../../../utils/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../models/product.model'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {


    try {
        if (req.method === "POST") {
            if (!req.body.name) return res.status(400).json({ message: 'Name required' })
            console.log('amount', req.body.name, req.body.amount, req.body.categoryId)
            let product = new Product({
                name: req.body.name,
                amount: req.body.amount,
                categoryId: req.body.categoryId
            })

            product = await product.save()
            console.log(product)
            return res.status(200).json(product)
        }
        if (req.method === "GET") {
            let product = await Product.find({})
            return res.status(200).json(product)
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server Error' })
    }

    return res.status(500).json({ message: 'Error Server' })

}

