//NextJs
import { NextApiRequest } from "next";

//GraphQL
import { ApolloServer } from "@apollo/server";
import { schema } from "../../../graphql/schema";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

//Cors
var cors = require("cors");

//Models
import dbConnect from "../../../utils/dbConnect";

//Auth
const jwt = require("jsonwebtoken");

dbConnect();

const getUser = (req: NextApiRequest) => {
  try {
    if (req) {
      const tokenWithBearer = req.headers.authorization || "";
      const token = tokenWithBearer.split(" ")[1];
      return jwt.verify(token, process.env.RESTO_JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const apolloServer = new ApolloServer({ schema });
export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({
    req,
    res,
    csrfPrevention: true, //cors
    user: getUser(req),
  }),
});
