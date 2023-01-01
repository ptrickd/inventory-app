//GraphQl
import { gql } from "apollo-server-micro";

//Models
import dbConnect from "../utils/dbConnect";
import User from "../models/user.model";

//Auth
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

interface IRegister {
  email: string;
  password: string;
}

interface IUpdate {
  theme: string;
}

export const typeDef = `
    type User {
        id: ID
        email: String
        theme: String
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

    type UpdateResponse{
        theme: String
        error: String
    }

    extend type Query {
        currentUser: User
    }

    extend type Mutation {
        register(email: String!, password: String!): RegisterResponse
        login(email: String!, password: String!): LoginResponse
        updateUser(theme: String!): UpdateResponse

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
          email: email.toLowerCase(),
          password: hashedPassword,
          theme: "light",
        });
        user = await user.save();
        if (!user) throw new Error("Failed to create user");
        return { user };
      } catch (err: any) {
        console.log(err.message);
        return { error: err.message };
      }
    },
    login: async (_: any, { email, password }: IRegister) => {
      try {
        const user = await User.findOne({ email });

        if (!user) throw new Error("Invalid Login");

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("Invalid Login");
        if (!process.env.RESTO_JWT_SECRET) throw new Error("Server Error");
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.RESTO_JWT_SECRET,
          { expiresIn: "1d" }
        );

        return { token, user };
      } catch (err: any) {
        console.log(err?.message);
        return { error: "Invalid Login" };
      }
    },
    updateUser: async (_: any, { theme }: IUpdate, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        if (theme === "light" || theme === "dark") {
          await User.updateOne({ _id: user.id }, { $set: { theme: theme } });
        } else {
          throw new Error("Theme value  is not a valid option");
        }

        return { theme: theme };
      } catch (err: any) {
        console.log(err.message);
        return { error: err.message };
      }
    },
  },
};
