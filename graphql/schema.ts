import { merge } from "lodash";

//schema.js
import { typeDef as Product, resolvers as productResolver } from "./product";
import { typeDef as Category, resolvers as categoryResolver } from "./category";
import { typeDef as User, resolvers as userResolver } from "./user";
import { typeDef as Report, resolvers as reportResolver } from "./report";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({
  typeDefs: [Product, Category, User, Report],
  resolvers: merge(
    productResolver,
    categoryResolver,
    reportResolver,
    userResolver
  ),
});
