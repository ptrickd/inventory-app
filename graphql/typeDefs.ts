//GraphQl
import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
    type Product {
        id: ID
        name: String
        amount: Int
        categoryId: ID
    }

    type Category {
        id: ID
        name: String
    }

    type User {
        id: ID!
        email: String!
    }

    type LoginResponse {
        token: String
        user: User
    }

    type Query {
        products: [Product]
        productsByCategory(categoryId: String): [Product]
        category(categoryId: ID): Category

        categories: [Category]

        currentUser: User!
    }

    type Mutation {
        createProduct(name:String, amount:Int, categoryId: String): Product
        editProduct(productId:ID, name:String, categoryId: String): Product
        deleteProduct(productId: ID): Product
        
        createCategory(name:String): Category
        editCategory(categoryId:ID, name:String): Category
        deleteCategory(categoryId:ID): Category

        register(email: String!, password: String!): User
        login(email: String!, password: String!): LoginResponse!
    }
`
