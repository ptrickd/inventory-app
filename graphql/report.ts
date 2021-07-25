//Models
import dbConnect from "../utils/dbConnect";
import Report from '../models/report.model'

//GraphQl
import { gql } from 'apollo-server-micro'

dbConnect()

interface ICreateReport {
    date: DateTime
    products: IProduct[]
}

interface IIds {
    [propName: string]: string
}

export const typeDef = gql`

    scalar Date

    input InputReportProduct {
        productId: String
        currentAmount: Int
        lastAmount: Int
    }

    type ReportProduct {
        productId: String
        currentAmount: Int
        lastAmount: Int
    }

    type ReportResponse {
        id: ID
        userId: String
        date: Date
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
        date: Date
        products: [ReportProduct]
    }

    type Query {
        report(reportId: ID): Report
        reports: ReportsResponse
    }

    type Mutation {
        createReport(date: Date!, products: [InputReportProduct]!): ReportResponse
    }
`
export const resolvers = {
    Query: {


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
