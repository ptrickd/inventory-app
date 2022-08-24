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
    unit: string
}

interface IEditProduct {
    productId: string
    name: string
    categoryId: string
    unit: string
}

export const typeDef = `
    type Product {
        id: ID
        name: String
        currentAmount: Int
        previousAmount: Int
        categoryId: ID
        userId: ID
        unit: String
    }

    type Query {
        products: [Product]
        productsByCategory(categoryId: String): [Product]
    }

    type Mutation {

        createProduct(
            name:String, 
            currentAmount:Int, 
            previousAmount:Int, 
            categoryId: String, 
            unit: String
            ): Product

        editProduct(
            productId:ID, 
            name:String, 
            currentAmount:Int, 
            previousAmount:Int, 
            categoryId: String, 
            unit: String
            ): Product
            
        deleteProduct(productId: ID): Product
        saveAmountProduct(productId: ID, updatedAmount: Int): Product
        saveUnitProduct(productId: ID, updatedUnit: String): Product
    }
`

export const resolvers = {
    Query: {
        products: async (_: any, _1: any, { user }: any) => {
            try {
                let products = []
                if (!user) throw new Error("Not Authenticated")
                // console.log(user)
                products = await Product.find({ userId: user.id })
                if (!products) throw new Error("Products not found")
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
                if (!user) throw new Error("Not Authenticated")
                console.log('categoryId: ', categoryId)
                let products = await Product.find({ categoryId: categoryId })
                console.log(products)
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
                if (!user) throw new Error("Not Authenticated")
                console.log('in create product')
                if (!MEASURE_UNITS.includes(unit)) throw new Error("Not a valid unit")
                let product = await Product.create({
                    name,
                    categoryId,
                    unit,
                    userId: user.id,
                })
                return product
            } catch (err: any) {
                console.log('err: createProduct mutation', err.message)
                return err
            }

        },
        editProduct: async (_: any, { productId, name, categoryId, unit }: IEditProduct, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                console.log(productId, name, categoryId, unit)
                // let editedProduct = await Product.findById(productId)

                // if (!editedProduct) throw new Error('No product found')
                // editedProduct.name = name
                // editedProduct.categoryId = categoryId
                // editedProduct.unit = "ea"
                // editedProduct = await editedProduct.save()

                // return editedProduct
                // return {}

            } catch (err: any) {
                console.log(err.message)
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
            } catch (err: any) {
                console.log(err.message)
                return err
            }

        },
        saveAmountProduct: async (_: any, { productId, updatedAmount }: TIds, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                const product = await Product.findById(productId)
                if (!product) throw new Error("No product found!")

                product.currentAmount = updatedAmount
                await product.save()
                return product
            }
            catch (err: any) {
                if (err.message) console.log(err.message)
                return err
            }
        },
        // saveUnitProduct(productId: ID, updatedUnit: String): Product
        saveUnitProduct: async (_: any, { productId, updatedUnit }: TIds, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                const product = await Product.findById(productId)
                if (!product) throw new Error("No product found!")

                if (!MEASURE_UNITS.includes(updatedUnit)) throw new Error("Not a valid unit")

                product.unit = updatedUnit
                await product.save()
                return product
            }
            catch (err: any) {
                if (err.message) console.log(err.message)
                return err
            }
        }
    }
}