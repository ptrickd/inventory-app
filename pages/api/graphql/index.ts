
//GraphQL
import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../../graphql/typeDefs'
import { resolvers } from '../../../graphql/resolvers'

//Models 
import dbConnect from '../../../utils/dbConnect'

//Auth
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

dbConnect()

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
