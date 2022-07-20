import { NextApiRequest, NextApiResponse } from 'next';
//GraphQL
import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../../graphql/schema'

//Cors
import Cors from 'micro-cors'
import { send } from 'micro'

//Models 
import dbConnect from '../../../utils/dbConnect'


//Auth
const jwt = require('jsonwebtoken')



dbConnect()

const cors = Cors()

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

const apolloServer: any = new ApolloServer({
    schema,
    // introspection: true,
    context: ({ req }) => {
        const tokenWithBearer = req.headers.authorization || ''
        const token = tokenWithBearer.split(' ')[1]
        const user = getUser(token)
        return { user }
    }
})
const startServer = apolloServer.start()

export const config = {
    api: {
        bodyParser: false,
        // externalResolver: true //to deal with error: "API resolved without sending a response for /api/graphql, this may result in stalled requests.""
    }
}



export default cors(async function handler(req: any, res: any) {
    if (req.method == "OPTIONS") {
        res.end()
        return false
    }

    await startServer

    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)

})
