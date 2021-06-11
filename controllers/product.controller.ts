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
        return product
    }
    catch (err) {
        console.log(err)
    }


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

export const getProductsByCategory = async (categoryId: string) => {
    try {
        let products = await Product.find({ categoryId: categoryId })
        return products
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteProduct = async (productId: string) => {
    // const { productId } = req.query
    // const deletedProduct = await Product.deleteOne({ _id: productId })

    // if (!deletedProduct) return res.status(404).json({ message: 'Product not found' })

    // // console.log('delete mthoed::', deletedProduct)
    // return res.status(200).json({ _id: productId })
}

export const editProduct = async (id: string, name: string, categoryId: string) => {
    console.log('editProduct function')
    let editedProduct = await Product.findById(id)
    editedProduct.name = name
    editedProduct.categoryId = categoryId
    editedProduct = await editedProduct.save()
    return editedProduct

}