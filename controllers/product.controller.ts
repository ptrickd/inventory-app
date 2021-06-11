import dbConnect from '../utils/dbConnect'
import Product from '../models/product.model'

dbConnect()

interface IProduct {
    _id: string
    name: string
    amount: number
    categoryId: string
}

export const createProduct = async (name: string, amount: number, categoryId: string) => {

    try {
        let product = await Product.create({ name, amount, categoryId })
        // console.log(product)
        return product
    }
    catch (err) {
        console.log(err)
    }

    console.log('product.index.ts after saving', product)
    // return savedProduct
    // return res.status(200).json(product)

}

export const getProducts = async () => {
    let products = []
    try {
        products = await Product.find({})

    }
    catch (err) {
        console.log(err)
    }
    return products
}