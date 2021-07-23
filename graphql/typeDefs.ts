//GraphQl
import { gql } from 'apollo-server-micro'

export const typeDefs = gql`

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

   

    type User {
        id: ID
        email: String
        error: String
    }

    type LoginResponse {
        token: String
        user: User
        error: String
    }

    type RegisterResponse {
        user: User
        error: String
    }

    type Query {

        currentUser: User

        report(reportId: ID): Report
        reports: ReportsResponse
    }

    type Mutation {

        register(email: String!, password: String!): RegisterResponse
        login(email: String!, password: String!): LoginResponse

        createReport(date: Date!, products: [InputReportProduct]!): ReportResponse
    }
`
