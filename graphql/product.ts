//Models
import dbConnect from '../utils/dbConnect'
import Product from '../models/product.model'

dbConnect()

interface IProduct {
    id: string
    name: string
    currentAmount: number
    previousAmount: number
    categoryId: string
}

interface ICreateProduct {
    name: string
    currentAmount: number
    previousAmount: number
    categoryId: string
}

interface IIds {
    [propName: string]: string
}

interface IEditProduct {
    productId: string
    name: string
    categoryId: string
}

export const typeDef = `
    type Product {
        id: ID
        name: String
        currentAmount: Int
        previousAmount: Int
        categoryId: ID
    }

    type Query {
        products: [Product]
        productsByCategory(categoryId: String): [Product]
    }

    type Mutation {
        createProduct(name:String, currentAmount:Int, previousAmount:Int, categoryId: String): Product
        editProduct(productId:ID, name:String, currentAmount:Int, previousAmount:Int, categoryId: String): Product
        deleteProduct(productId: ID): Product
        saveAmountProduct(productId: ID, updatedAmount: Int): Product
    }
`

export const resolvers = {
    Query: {
        products: async (_: any, _1: any, { user }: any) => {
            try {
                let products = []
                if (!user) throw new Error("Not Authenticated")
                products = await Product.find({})
                if (!products) throw new Error("Products not found")
                return products.map(({ id, currentAmount, previousAmount, name, categoryId }: IProduct) => ({
                    id,
                    name,
                    currentAmount,
                    previousAmount,
                    categoryId
                }))
            } catch (err) {
                console.log(err)
                return err
            }
        },
        productsByCategory: async (_: any, { categoryId }: IIds, { user }: any) => {
            try {
                console.log('getProductsByCategory')
                let products = await Product.find({ categoryId: categoryId })
                if (!products) throw new Error('No products found')
                return products.map(({ id, currentAmount, previousAmount, name, categoryId }: IProduct) => ({
                    id,
                    name,
                    currentAmount,
                    previousAmount,
                    categoryId
                }))
            }
            catch (err) {
                console.log(err)
                return err
            }
        },
    },
    Mutation: {
        createProduct: async (_: any, { name, currentAmount, previousAmount, categoryId }: ICreateProduct, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let product = await Product.create({ name, currentAmount, previousAmount, categoryId })
                return product
            } catch (err) {
                console.log(err)
                return err
            }

        },
        editProduct: async (_: any, { productId, name, categoryId }: IEditProduct, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let editedProduct = await Product.findById(productId)

                if (!editedProduct) throw new Error('No product found')
                editedProduct.name = name
                editedProduct.categoryId = categoryId
                editedProduct = await editedProduct.save()

                return editedProduct

            } catch (err) {
                console.log(err)
                return err
            }

        },
        deleteProduct: async (_: any, { productId }: IIds, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                const deletedProduct = await Product.findById(productId)
                await Product.deleteOne({ _id: productId })
                if (!deletedProduct) throw new Error('No product found')
                return deletedProduct
            } catch (err) {
                console.log(err)
                return err
            }

        },
        saveAmountProduct: async (_: any, { productId, updatedAmount }: IIds, { user }: any) => {
            try {
                console.log('saveAmounProduct')
                if (!user) throw new Error("Not Authenticated")
                const product = await Product.findById(productId)
                if (!product) throw new Error("No product found")

                product.currentAmount = updatedAmount
                await product.save()
                return product
            }
            catch (err) {
                console.log(err)
                return err
            }
        }
    }
}