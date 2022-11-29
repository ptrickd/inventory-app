//GraphQl
import { gql } from "apollo-server-micro";

//Models
import dbConnect from "../utils/dbConnect";
import User from "../models/user.model";

//Auth
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dbConnect();

interface IRegister {
  email: string;
  password: string;
}

export const typeDef = `
    type User {
        id: ID
        email: String
        error: String
    }

    type LoginResponse {
        token: String
        user: User
        error: String
    }

    type RegisterResponse {
        user: User
        error: String
    }

    extend type Query {
        currentUser: User
    }

    extend type Mutation {
        register(email: String!, password: String!): RegisterResponse
        login(email: String!, password: String!): LoginResponse

    }
`;

export const resolvers = {
  Query: {
    currentUser: async (_: any, _1: any, { user }: any) => {
      try {
        if (!user) return null;
        return User.findOne({ _id: user.id });
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
  Mutation: {
    register: async (_: any, { email, password }: IRegister) => {
      try {
        let user = await User.findOne({ email });
        if (user) throw new Error("Failed to create user");

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
          email,
          password: hashedPassword,
        });
        user = await user.save();
        if (!user) throw new Error("Failed to create user");
        return { user };
      } catch (err: any) {
        return { error: err.message };
      }
    },
    login: async (_: any, { email, password }: IRegister) => {
      try {
        const user = await User.findOne({ email });

        if (!user) throw new Error("Invalid Login no user");

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("Invalid Login wrong password");

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.RESTO_JWT_SECRET,
          { expiresIn: "1d" }
        );

        return { token, user };
      } catch (err) {
        return { error: "Invalid Login: Error has been throw" };
      }
    },
  },
};
