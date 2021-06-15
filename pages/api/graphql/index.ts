
//GraphQL
import { ApolloServer, gql } from 'apollo-server-micro'

//Models 
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user.model'

//Controller
import {
    createProduct,
    getProducts,
    getProductsByCategory,
    editProduct,
    deleteProduct
} from '../../../controllers/product.controller'
import {
    getCategories,
    createCategory,
    getCategory,
    editCategory,
    deleteCategory
} from '../../../controllers/category.controller'

//Auth
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

dbConnect()

const typeDefs = gql`
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
        getProducts: [Product]
        getProductsByCategory(categoryId: String): [Product]
        getCategory(categoryId: ID): Category

        getCategories: [Category]

        currentUser: User!
    }

    type Mutation {
        createProduct(name:String, amount:Int, categoryId: String): Product
        editProduct(productId:ID, name:String, categoryId: String): Product
        deleteProduct(productId: ID): Product
        
        createCategory(name:String): Category
        editCategory(categoryId:ID, name:String): Category
        deleteCategory(categoryId:ID): Category

        register(email: String!, password: String!): User!
        login(email: String!, password: String!): LoginResponse!
    }
`

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
}

interface IRegister {
    email: String
    password: String
}

interface IUser {
    email: String
    password: String
}

const resolvers = {
    Query: {
        getProducts: async () => {
            try {
                const products = await getProducts()
                return products.map(({ id, amount, name, categoryId }: IProduct) => ({
                    id,
                    name,
                    amount,
                    categoryId
                }))
            } catch (err) {
                console.log(err)
            }
        },
        getProductsByCategory: async (_: any, { categoryId }: IIds) => {
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
            }
        },
        getCategory: async (_: any, { categoryId }: IIds) => {
            try {
                console.log('categoryId', categoryId)
                const category = await getCategory(categoryId)

                if (!category) throw new Error("No Category Found");

                return category
            }
            catch (err) {
                console.log(err)
            }
        },
        getCategories: async () => {
            try {
                console.log('in getCategories')
                const categories = await getCategories()
                if (!categories) throw new Error("No Categories Found")
                return categories.map(({ id, name }) => ({
                    id, name
                }))
            }
            catch (err) {
                console.log(err)
            }
        },
        currentUser: (_: any, _1: any, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                return User.findOne({ _id: user.id })
            }
            catch (err) {
                console.log(err)
            }

        }
    },
    Mutation: {
        createProduct: async (_: any, { name, amount, categoryId }: ICreateProduct) => {

            let product = await createProduct(name, amount, categoryId)
            return product
        },
        editProduct: async (_: any, { productId, name, categoryId }: IEditProduct) => {
            let product = await editProduct(productId, name, categoryId)
            if (!product) throw new Error('No product found')
            return product
        },
        deleteProduct: async (_: any, { productId }: IIds) => {
            let product = await deleteProduct(productId)
            if (!product) throw new Error('No product found')
            return product
        },
        createCategory: async (_: any, { name }: IIds) => {
            console.log('createCategory', name)
            let category = await createCategory(name)
            if (!category) throw new Error("No Category Create")
            return category

        },
        editCategory: async (_: any, { categoryId, name }: ICategory) => {
            let editedCategory = await editCategory(categoryId, name)
            if (!editedCategory) throw new Error("No Category Found")
            return editedCategory
        },
        deleteCategory: async (_: any, { categoryId }: IIds) => {
            let deletedCategory = await deleteCategory(categoryId)
            if (!deletedCategory) throw new Error("No Category Found")
            return deletedCategory
        },
        register: async (_: any, { email, password }: IRegister) => {
            const hashedPassword = await bcrypt.hash(password, 10)
            let user = new User({
                email, password: hashedPassword
            })
            user = await user.save()
            if (!user) throw new Error("Failed to create user")
            return user
        },
        login: async (_: any, { email, password }: IRegister) => {
            const user = await User.findOne({ email })
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
    }
}

const getUser = (token: string) => {
    try {
        if (token) {
            return jwt.verify(token, process.env.RESTO_JWT_SECRET)
        }
        return null
    }
    catch (err) {
        return null
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const tokenWithBearer = req.headers.authorization || ''
        const token = tokenWithBearer.split(' ')[1]
        const user = getUser(token)
        return { user }
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default apolloServer.createHandler({ path: "/api/graphql" })
