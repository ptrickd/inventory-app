//NextJs
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

//GraphQL
import { ApolloServer } from "@apollo/server";
import { schema } from "../../../graphql/schema";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

//Models
import dbConnect from "../../../utils/dbConnect";

//Auth
import jwt from "jsonwebtoken";

dbConnect();

const getUser = (req: NextRequest) => {
  try {
    console.log(`req: ->`);
    console.log(req.headers.get("authorization"));
    if (req) {
      const tokenWithBearer = req.headers.get("authorization") || "";
      const token = tokenWithBearer.split(" ")[1];

      return jwt.verify(token, process.env.RESTO_JWT_SECRET as string);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const apolloServer = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextRequest, res) => ({
    req,
    res,
    csrfPrevention: true, //cors
    user: getUser(req),
  }),
});
export { handler as GET, handler as POST };
