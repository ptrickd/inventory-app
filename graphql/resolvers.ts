//Models 
import dbConnect from '../utils/dbConnect'
import User from '../models/user.model'
import { Category } from '../models/category.model'
import Report from '../models/report.model'

//Controller
// import {
//     createProduct,
//     getProducts,
//     getProductsByCategory,
//     editProduct,
//     deleteProduct
// } from '../controllers/product.controller'
// import {
//     getCategory,
//     editCategory,
//     deleteCategory
// } from '../controllers/category.controller'

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




interface IIds {
    [propName: string]: string
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
        report: async (_: any, { reportId }: IIds, { user }: any) => {
            try {
                if (!user) throw new Error('Not Authenticated')
                const report = await Report.findById(reportId)
                if (!report) throw new Error('No report found')
                return report
            }
            catch (err) {
                console.log(err)
                return { error: err.message }
            }
        },
        reports: async (_: any, _1: any, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let reports = await Report.find({ userId: user.id })
                return { reports }

            }
            catch (err) {
                return { error: err.message }
            }
        }
    },
    Mutation: {
        
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
