//Models 
import dbConnect from '../utils/dbConnect'
import User from '../models/user.model'
import { Category } from '../models/category.model'
import Report from '../models/report.model'

//Controller
import {
    createProduct,
    getProducts,
    getProductsByCategory,
    editProduct,
    deleteProduct
} from '../controllers/product.controller'
import {
    getCategory,
    editCategory,
    deleteCategory
} from '../controllers/category.controller'

//Auth
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Time
import { DateTime } from 'luxon'

dbConnect()

interface ICreateReport {
    date: DateTime
    products: IProduct[]
}
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

interface ICategory {
    categoryId: string
    name: string
    userId: string
}

interface IRegister {
    email: string
    password: string
}

interface IUser {
    email: String
    password: String
}


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
        category: async (_: any, { categoryId }: IIds, { user }: any) => {
            try {
                console.log('categoryId', categoryId)
                if (!user) throw new Error("Not Authenticated")
                const category = await getCategory(categoryId)

                if (!category) throw new Error("No Category Found");

                return category
            }
            catch (err) {
                console.log(err)
                return err
            }
        },
        categories: async (_: any, { userId }: IIds, { user }: any) => {
            try {
                console.log('in getCategories')
                if (!user) throw new Error("Not Authenticated")
                const categories = await Category.find({ userId })
                if (!categories) throw new Error("No Categories Found")
                return categories.map(({ id, name, userId }) => ({
                    id, name, userId
                }))
            }
            catch (err) {
                console.log(err)
                return err
            }
        },
        currentUser: async (_: any, _1: any, { user }: any) => {
            try {
                if (!user) return null

                return User.findOne({ _id: user.id })
            }
            catch (err) {
                console.log(err)
                return err
            }

        },
        reports: async (_: any, _1: any, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let reports = await Report.find({ userId: user.id })
                return reports

            }
            catch (err) {
                return { error: err.message }
            }
        }
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
        createCategory: async (_: any, { name, userId }: IIds, { user }: any) => {
            try {
                console.log('createCategory name', name)
                console.log('createCategory userId', userId)
                if (!user) throw new Error("Not Authenticated")
                let category = await Category.create({ name, userId })
                console.log('category::', category)
                if (!category) throw new Error("No Category Created")
                return category
            } catch (err) {
                console.log(err)
                return err
            }


        },
        editCategory: async (_: any, { categoryId, name }: ICategory, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let editedCategory = await editCategory(categoryId, name)
                if (!editedCategory) throw new Error("No Category Found")
                return editedCategory
            } catch (err) {
                console.log(err)
                return err
            }

        },
        deleteCategory: async (_: any, { categoryId }: IIds, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let deletedCategory = await deleteCategory(categoryId)
                if (!deletedCategory) throw new Error("No Category Found")
                return deletedCategory
            } catch (err) {
                console.log(err)
                return err
            }

        },
        register: async (_: any, { email, password }: IRegister) => {

            try {
                let user = await User.findOne({ email })
                if (user) throw new Error('Failed to create user')

                const hashedPassword = await bcrypt.hash(password, 10)
                user = new User({
                    email, password: hashedPassword
                })
                user = await user.save()
                if (!user) throw new Error("Failed to create user")
                return { user }
            }
            catch (err) {
                return { error: err.message }
            }

        },
        login: async (_: any, { email, password }: IRegister) => {
            try {
                const user = await User.findOne({ email })
                // console.log('user from login', user)

                if (!user) throw new Error("Invalid Login")
                const passwordMatch = await bcrypt.compare(password, user.password)
                if (!passwordMatch) throw new Error("Invalid Login")

                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.RESTO_JWT_SECRET,
                    { expiresIn: '30d' }
                )

                return { token, user }
            }
            catch (err) {
                return { error: 'Invalid Login' }
            }

        },
        createReport: async (_: any, { date, products }: ICreateReport, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let report = await Report.create({
                    userId: user.id,
                    date,
                    products
                })
                if (!report) throw new Error("Can't create report")
                return report
            } catch (err) {
                // return { error: err.message }
                return { error: err.message }
            }
        }
    }
}
