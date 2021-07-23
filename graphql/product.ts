//Models
import dbConnect from '../utils/dbConnect'

//Controller
import {
    createProduct,
    getProducts,
    getProductsByCategory,
    editProduct,
    deleteProduct
} from '../controllers/product.controller'

interface IProduct {
    id: string
    name: string
    amount: number
    categoryId: string
}

interface ICreateProduct {
    name: string
    amount: number
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
        amount: Int
        categoryId: ID
    }

    type Query {
        products: [Product]
        productsByCategory(categoryId: String): [Product]
    }
`

export const resolvers = {
    Query: {
        products: async (_: any, _1: any, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                const products = await getProducts()
                return products.map(({ id, amount, name, categoryId }: IProduct) => ({
                    id,
                    name,
                    amount,
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
                const products = await getProductsByCategory(categoryId)
                if (!products) throw new Error('No products found')
                return products.map(({ id, amount, name, categoryId }: IProduct) => ({
                    id,
                    name,
                    amount,
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
        createProduct: async (_: any, { name, amount, categoryId }: ICreateProduct, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let product = await createProduct(name, amount, categoryId)
                return product
            } catch (err) {
                console.log(err)
                return err
            }

        },
        editProduct: async (_: any, { productId, name, categoryId }: IEditProduct, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let product = await editProduct(productId, name, categoryId)
                if (!product) throw new Error('No product found')
                return product
            } catch (err) {
                console.log(err)
                return err
            }

        },
        deleteProduct: async (_: any, { productId }: IIds, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let product = await deleteProduct(productId)
                if (!product) throw new Error('No product found')
                return product
            } catch (err) {
                console.log(err)
                return err
            }

        },
    }
}