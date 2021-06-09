//Type
import type { NextApiRequest, NextApiResponse } from 'next'

//GraphQL
import { ApolloServer, gql } from 'apollo-server-micro'

//Controller
import { createProduct, getProducts } from '../../../controllers/product.controller'

const typeDefs = gql`
    type Product {
        id: ID
        amount: Int
        categoryId: ID
    }

    type Query {
        getProducts: [Product]
    }
`

interface IProduct {
    id: string
    amount: number
    categoryId: string
}

const resolvers = {
    Query: {
        getProducts: async () => {
            try {
                const products = await getProducts()
                return products.data.map(({ id, amount, categoryId }: IProduct) => ({
                    id,
                    amount,
                    categoryId
                }))
            } catch (err) {
                throw err
            }
        }
    }
}


const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    res.json({ test: 'test' })

}