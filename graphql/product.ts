//Models
import dbConnect from '../utils/dbConnect'
import Product from '../models/product.model'

//Types
import { TIds, IProduct } from '../types/types'

//Constants
import { MEASURE_UNITS } from '../constants/measureUnits'

//Validation
// import Joi from joi

dbConnect()

interface ICreateProduct {
    name: string
    currentAmount: number
    previousAmount: number
    categoryId: string
    userId: string
    unit: number
}

interface IEditProduct {
    productId: string
    name: string
    categoryId: string
    unit: number
}

export const typeDef = `
    type Product {
        id: ID
        name: String
        currentAmount: Int
        previousAmount: Int
        categoryId: ID
        userId: ID
        unit: Int
    }

    type Query {
        products: [Product]
        productsByCategory(categoryId: String): [Product]
    }

    type Mutation {
        createProduct(name:String, currentAmount:Int, previousAmount:Int, categoryId: String, unit: Int): Product
        editProduct(productId:ID, name:String, currentAmount:Int, previousAmount:Int, categoryId: String, unit: Int): Product
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
                products = await Product.find({ userId: user.id })
                console.log('products:', products)
                console.log('user:', user)
                if (!products) throw new Error("Products not found")
                console.log('after new Error')
                return products.map((
                    { id, currentAmount, previousAmount, name, categoryId, unit }: IProduct
                ) => ({
                    id,
                    name,
                    currentAmount,
                    previousAmount,
                    categoryId,
                    unit
                }))
            } catch (err) {
                console.log('error in products query', err)
                return err
            }
        },
        productsByCategory: async (_: any, { categoryId }: TIds, { user }: any) => {
            try {
                console.log('getProductsByCategory')
                let products = await Product.find({ categoryId: categoryId })
                if (!products) throw new Error('No products found')
                return products.map((
                    { id, currentAmount, previousAmount, name, categoryId, unit }: IProduct
                ) => ({
                    id,
                    name,
                    currentAmount,
                    previousAmount,
                    categoryId,
                    unit
                }))
            }
            catch (err) {
                console.log(err)
                return err
            }
        },
    },
    Mutation: {
        createProduct: async (_: any, { name, categoryId, unit }: ICreateProduct, { user }: any) => {
            try {
                console.log('before if in createProduct')
                if (!user) throw new Error("Not Authenticated")
                console.log('after if in createProduct')
                let product = await Product.create({
                    name,
                    categoryId,
                    unit,
                    userId: user.id,
                })
                console.log('product::', product)
                return product
            } catch (err) {
                console.log('err: createProduct mutation', err)
                return err
            }

        },
        editProduct: async (_: any, { productId, name, categoryId, unit }: IEditProduct, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let editedProduct = await Product.findById(productId)

                if (!editedProduct) throw new Error('No product found')
                editedProduct.name = name
                editedProduct.categoryId = categoryId
                editedProduct.unit = unit
                editedProduct = await editedProduct.save()

                return editedProduct

            } catch (err) {
                console.log(err)
                return err
            }

        },
        deleteProduct: async (_: any, { productId }: TIds, { user }: any) => {
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
        saveAmountProduct: async (_: any, { productId, updatedAmount }: TIds, { user }: any) => {
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