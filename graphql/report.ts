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
    categoryId: string
}
interface ICreateReport {
    dateEndingCycle: Date
}

export const typeDef = gql`

    scalar Date

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

    type createdReportResponse {
        id: ID
        userId: String
        dateEndingCycle: Date
        dateCreated: Date
    }

    type ReportResponse {
        id:ID
        dateEndingCycle: Date
        error: String
    }

    type ReportsResponse {
        id:ID
        reports:[ReportResponse]
        error: String
    }

    type Report {
        id: ID
        userId: String
        dateCreated: Date
        dateEndingCycle: Date
    }

    extend type Query {
        report(reportId: ID): Report
        reports: ReportsResponse
    }

    extend type Mutation {
        createReport(
            dateEndingCycle: Date
            ): createdReportResponse
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
            catch (err: any) {
                console.log(err.message)
                return { error: err.message }
            }
        },
        reports: async (_: any, _1: any, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let reports = await Report.find({ userId: user.id })
                console.log(reports)
                return { reports }

            }
            catch (err: any) {
                return { error: err.message }
            }
        }
    },
    Mutation: {


        createReport: async (_: any, { dateEndingCycle }: ICreateReport, { user }: any) => {
            try {

                if (!user) throw new Error("Not Authenticated")

                let report = await Report.create({
                    userId: user.id,
                    dateEndingCycle,
                    dateCreated: DateTime.now().toISO()
                })




                //when submitting
                //create a routine get currentAmount 
                //dateSubmitted
                //hasBeenSubmitting
                //writing last amount
                // resetting currentAmount
                //add products to report



                if (!report) throw new Error("Can't create report")

                return report
            } catch (err: any) {
                return { error: err.message }
            }
        }
    }
}
