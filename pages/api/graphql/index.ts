//GraphQL
import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../../graphql/schema'

//Models 
import dbConnect from '../../../utils/dbConnect'

//Auth
const jwt = require('jsonwebtoken')

dbConnect()

const getUser = (token: string | undefined) => {
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
    schema,
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
