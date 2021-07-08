//GraphQl
import { gql } from 'apollo-server-micro'

export const typeDefs = gql`

    scalar Date

    input InputReportProduct {
        productId: String
        currentAmount: Int
        lastAmount: Int
    }

    type Product {
        id: ID
        name: String
        amount: Int
        categoryId: ID
    }

    type ReportProduct {
        productId: String
        currentAmount: Int
        lastAmount: Int
    }

    type ReportResponse {
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
        userId: String
        date: Date
        products: [ReportProduct]
    }

    type Category {
        id: ID
        name: String
        userId: String
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
        products: [Product]
        productsByCategory(categoryId: String): [Product]
        category(categoryId: ID): Category

        categories(userId: String): [Category]

        currentUser: User

        reports: ReportsResponse
    }

    type Mutation {
        createProduct(name:String, amount:Int, categoryId: String): Product
        editProduct(productId:ID, name:String, categoryId: String): Product
        deleteProduct(productId: ID): Product
        
        createCategory(name:String, userId: String): Category
        editCategory(categoryId:ID, name:String): Category
        deleteCategory(categoryId:ID): Category

        register(email: String!, password: String!): RegisterResponse
        login(email: String!, password: String!): LoginResponse

        createReport(date: Date!, products: [InputReportProduct]!): ReportResponse
    }
`
