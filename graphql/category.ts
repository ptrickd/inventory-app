//GraphQl
import { gql } from "apollo-server-micro";

//Models
import dbConnect from "../utils/dbConnect";
import { Category } from "../models/category.model";

//Types
import { TIds } from "../types/types";
import mongoose from "mongoose";

dbConnect();

interface ICategory {
  categoryId: string;
  name: string;
  userId: string;
}

export const typeDef = gql`
  type Category {
    id: ID
    name: String
    userId: String
    error: String
  }

  extend type Query {
    category(categoryId: ID): Category
    categories: [Category]
    numOfCategories: Int
  }

  extend type Mutation {
    createCategory(name: String): Category
    editCategory(categoryId: ID, name: String): Category
    deleteCategory(categoryId: ID): Category
  }
`;

export const resolvers = {
  Query: {
    category: async (_: any, { categoryId }: TIds, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        let category = await Category.findById(categoryId);

        if (!category) throw new Error("No Category Found");

        return category;
      } catch (err: any) {
        console.log(err.message);
        const category = { error: err.message };
        return category;
      }
    },
    categories: async (_: any, _1: any, { user }: any) => {
      try {
        // console.log('\n\nin getCategories')
        // console.log('user', user)

        if (!user) throw new Error("Not Authenticated");

        const categories = await Category.find({
          userId: user.id,
        });
        // const categories = await Category.find();

        if (!categories) throw new Error("No Categories Found");
        // console.log('categories: ', categories)
        // console.log(user.id, '\n\n')

        return categories.map(({ id, name, userId }) => ({
          id,
          name,
          userId,
        }));
      } catch (err: any) {
        console.log("printing error", err.message);
        return err;
      }
    },
    numOfCategories: async (_: any, _1: any, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");

        return await Category.countDocuments({ userId: user.id });
      } catch (err: any) {
        console.log("printing error:", err.message);
        return err;
      }
    },
  },
  Mutation: {
    createCategory: async (_: any, { name }: TIds, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        let sameCategoryName = await Category.findOne({ name });
        if (sameCategoryName) {
          throw new Error("That category name already exist!");
        }

        let category = await Category.create({ name, userId: user.id });
        if (!category) throw new Error("No Category Created");
        return category;
      } catch (err: any) {
        console.log(err.message);
        const category = { error: err.message };
        return category;
      }
    },
    editCategory: async (
      _: any,
      { categoryId, name }: ICategory,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        let editedCategory = await Category.findById(categoryId);
        if (!editedCategory) throw new Error("No Category Found");
        editedCategory.name = name;
        editedCategory = await editedCategory.save();
        return editedCategory;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    deleteCategory: async (_: any, { categoryId }: TIds, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        let deletedCategory = await Category.findById(categoryId);
        if (!deletedCategory) throw new Error("No Category Found");
        await Category.deleteOne({ _id: categoryId });
        return deletedCategory;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
};
