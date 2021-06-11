
//GraphQL
import { ApolloServer, gql } from 'apollo-server-micro'

//Controller
import { createProduct, getProducts } from '../../../controllers/product.controller'

const typeDefs = gql`
    type Product {
        id: ID
        name: String
        amount: Int
        categoryId: ID
    }

    type Query {
        getProducts: [Product]
    }

    type Mutation {
        createProduct(name:String, amount:Int, categoryId: String): Product
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
                throw err
            }
        }
    },
    Mutation: {
        createProduct: async (_: any, { name, amount, categoryId }: ICreateProduct) => {

            let product = await createProduct(name, amount, categoryId)
            // console.log(product)
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
