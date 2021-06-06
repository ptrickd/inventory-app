import dbConnect from '../../../utils/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../models/product.model'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'DELETE') {
            const { productId } = req.query
            const deletedProduct = await Product.deleteOne({ _id: productId })
            if (!deletedProduct) return res.status(404).json({ message: 'Product not found' })
            console.log('delete mthoed::', deletedProduct)
            return res.status(200).json({ _id: productId })
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server Error' })
    }

    return res.status(500).json({ message: 'Error Server' })
}