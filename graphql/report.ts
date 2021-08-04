//Models
import dbConnect from "../utils/dbConnect";
import Report from '../models/report.model'
import Product from '../models/product.model'

//GraphQl
import { gql } from 'apollo-server-micro'

//Time
import { DateTime } from 'luxon'

//Types
import { TIds, IProduct } from '../types/types'

dbConnect()


interface IProductInReport {
    productId: string
    amount: number
    name: string
}
interface ICreateReport {
    date: DateTime
    products: IProductInReport[]
    createdDate: DateTime
}

export const typeDef = gql`

    scalar timestamptz

    input InputReportProduct {
        productId: String
        amount: Int
        name: String
        categoryId: String
    }

    type ReportProduct {
        productId: String
        amount: Int
        name: String
        categoryId: String
    }

    type ReportResponse {
        id: ID
        userId: String
        date: timestamptz
        products: [ReportProduct]
        error: String
    }

    type ReportsResponse {
        reports:[ReportResponse]
        error: String
    }

    type Report {
        id: ID
        userId: String
        date: timestamptz
        products: [ReportProduct]
    }

    extend type Query {
        report(reportId: ID): Report
        reports: ReportsResponse
    }

    extend type Mutation {
        createReport(
            date: timestamptz, 
            products: [InputReportProduct],
            createdDate: timestamptz
            ): ReportResponse
    }
`
export const resolvers = {
    Query: {
        report: async (_: any, { reportId }: TIds, { user }: any) => {
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


        createReport: async (_: any, { date, products, createdDate }: ICreateReport, { user }: any) => {
            try {

                if (!user) throw new Error("Not Authenticated")

                let report = await Report.create({
                    userId: user.id,
                    date,
                    products,
                    dateSubmitted: createdDate
                })

                products.map(async (product: IProductInReport) => {
                    console.log(product)
                    let productToModify = await Product.findById(product.productId)
                    productToModify.previousAmount = product.amount
                    productToModify.currentAmount = 0
                    await productToModify.save()
                })

                if (!report) throw new Error("Can't create report")

                return report
            } catch (err) {
                return { error: err.message }
            }
        }
    }
}
