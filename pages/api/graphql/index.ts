
//GraphQL
import { ApolloServer, gql } from 'apollo-server-micro'

//Controller
import { createProduct, getProducts, getProductsByCategory, editProduct, deleteProduct } from '../../../controllers/product.controller'

const typeDefs = gql`
    type Product {
        id: ID
        name: String
        amount: Int
        categoryId: ID
    }

    type Query {
        getProducts: [Product]
        getProductsByCategory(categoryId: String): [Product]
    }

    type Mutation {
        createProduct(name:String, amount:Int, categoryId: String): Product
        editProduct(id:ID, name:String, categoryId: String): Product
        deleteProduct(productId: ID): Product
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

interface IGetProductsByCategory {
    categoryId: string
}

interface IEditProduct {
    id: string
    name: string
    categoryId: string
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
        getProductsByCategory: async (_: any, { categoryId }: IGetProductsByCategory) => {
            try {
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
        }
    },
    Mutation: {
        createProduct: async (_: any, { name, amount, categoryId }: ICreateProduct) => {

            let product = await createProduct(name, amount, categoryId)
            return product
        },
        editProduct: async (_: any, { id, name, categoryId }: IEditProduct) => {
            let product = await editProduct(id, name, categoryId)
            if (!product) throw new Error('No product found')
            return product
        }
    }
}


const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: {
        bodyParser: false
    }
}

export default apolloServer.createHandler({ path: "/api/graphql" })
