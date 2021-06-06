import dbConnect from '../../../../utils/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../../models/product.model'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        if (req.method === "GET") {
            const { categoryId } = req.query
            // console.log('products not found', categoryId)
            const products = await Product.find({ categoryId: categoryId })
            // console.log('products not found')
            if (!products) {
                return res.status(404).json({ message: 'Products not found' })
            }
            // console.log('products', products)
            return res.status(200).json(products)
        }

    } catch (err) {
        return res.status(500).json({ message: 'Server Error' })
    }

    return res.status(500).json({ message: 'Error Server' })
}