//Mongoose
import mongoose from "mongoose";

//Models
import dbConnect from "../utils/dbConnect";
import Product from "../models/product.model";

//Types
import { TIds, IProduct } from "../types/types";

//Constants
import { MEASURE_UNITS } from "../constants/measureUnits";

//Validation
import Joi from "joi";

dbConnect();

interface ICreateProduct {
  name: string;
  currentAmount: number;
  previousAmount: number;
  categoryId: string;
  userId: string;
  unit: string;
}

interface IEditProduct {
  productId: string;
  name: string;
  categoryId: string;
  unit: string;
}

export const typeDef = `
    type Categories {
        currentAmount: Int
        previousAmount: Int
        categoryId: ID
    }

    type Product {
        id: ID
        name: String
        categories: [Categories]
        userId: ID
        unit: String
        error: String
    }

    type Query {
        products: [Product]
        productsByCategory(categoryId: String): [Product]
        numOfProducts: Int
    }

    type Mutation {

        createProduct(
            name:String, 
            currentAmount:Int, 
            previousAmount:Int, 
            categoryId: String, 
            unit: String,
            error: String
            ): Product

        editProduct(
            productId:String, 
            name:String, 
            currentAmount:Int, 
            previousAmount:Int, 
            categoryId: String, 
            unit: String
            ): Product
            
        deleteProduct(productId: ID): Product
        saveAmountProduct(productId: ID, updatedAmount: Int): Product
        saveUnitProduct(productId: ID, updatedUnit: String): Product
    }
`;

export const resolvers = {
  Query: {
    products: async (_: any, _1: any, { user }: any) => {
      try {
        let products = [];
        if (!user) throw new Error("Not Authenticated");
        // console.log(user)
        products = await Product.find({ userId: user.id });
        if (!products) throw new Error("Products not found");
        return products.map(({ id, categories, name, unit }: IProduct) => ({
          id,
          name,
          categories,
          unit,
        }));
      } catch (err) {
        console.log("error in products query", err);
        return err;
      }
    },
    productsByCategory: async (_: any, { categoryId }: TIds, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        console.log("categoryId: ", categoryId);
        let products = await Product.find({ categoryId: categoryId });
        console.log(products);
        if (!products) throw new Error("No products found");

        return products.map(({ id, categories, name, unit }: IProduct) => ({
          id,
          name,
          categories,
          unit,
        }));
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    numOfProducts: async (_: any, _1: any, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        return await Product.countDocuments();
      } catch (err) {
        console.log("printing error: ", err);
        return err;
      }
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      { name, categoryId, unit }: ICreateProduct,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");

        if (!MEASURE_UNITS.includes(unit)) throw new Error("Not a valid unit");

        //Verify if the product already exist
        let sameNameProduct = await Product.find({
          userId: user.id,
          name,
        });

        //If exist  throw error
        if (Boolean(sameNameProduct.length))
          throw new Error(
            "This is already a product of the same name in that category"
          );

        //If product don't exist
        const categoryIdObj = new mongoose.Types.ObjectId(categoryId);
        const category = { categoryId: categoryIdObj };

        let product = await Product.create({
          name,
          categories: category,
          unit,
          userId: user.id,
        });

        return product;
      } catch (err: any) {
        console.log(err.message);
        return { error: err.message };
      }
    },
    editProduct: async (
      _: any,
      { productId, name, categoryId, unit }: IEditProduct,
      { user }: any
    ) => {
      try {
        //Verify auth
        if (!user) throw new Error("Not Authenticated");

        //Cast String to ObjectId
        const productIdObj = new mongoose.Types.ObjectId(productId);

        let editedProduct = await Product.findById(productIdObj);

        if (!editedProduct) throw new Error("No product found");

        //Validation
        const validationSchema = Joi.object({
          name: Joi.string()
            .pattern(/[\da-zA-Z ]/i) //alphanum + spaces
            .min(3)
            .max(30)
            .required(),
          unit: Joi.string()
            .alphanum()
            .valid(...MEASURE_UNITS)
            .required(),
        });

        //Validation name unit
        const result = validationSchema.validate({
          name,
          unit,
        });

        //throw a error if validation do not pass
        if (result.error) throw new Error(result.error.details[0].message);

        //Assign new value to sb object
        editedProduct.name = name;
        editedProduct.unit = unit;

        //verify if categoryId already in
        const sameCategoryId = editedProduct.categories.filter(
          (category: { categoryId: mongoose.Types.ObjectId }) => {
            if (String(category.categoryId) === categoryId) {
              return category;
            }
          }
        );

        //Verify if the product is already added on that category
        if (sameCategoryId.length)
          throw new Error("That product already exist on that category");

        //Add to categories array if categoryId is povided
        if (categoryId) {
          const newCategory = {
            categoryId,
            currentAmount: 0,
            previousAmount: 0,
          };

          editedProduct.categories.push(newCategory);
        }

        editedProduct = await editedProduct.save();

        return editedProduct;
      } catch (err: any) {
        console.error(err.message);
        return err;
      }
    },
    deleteProduct: async (_: any, { productId }: TIds, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        const deletedProduct = await Product.findById(productId);
        await Product.deleteOne({ _id: productId });
        if (!deletedProduct) throw new Error("No product found");
        return deletedProduct;
      } catch (err: any) {
        console.error(err.message);
        return err;
      }
    },
    saveAmountProduct: async (
      _: any,
      { productId, updatedAmount }: TIds,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        const product = await Product.findById(productId);
        if (!product) throw new Error("No product found!");

        product.currentAmount = updatedAmount;
        await product.save();
        return product;
      } catch (err: any) {
        if (err.message) console.log(err.message);
        return err;
      }
    },
    // saveUnitProduct(productId: ID, updatedUnit: String): Product
    saveUnitProduct: async (
      _: any,
      { productId, updatedUnit }: TIds,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        const product = await Product.findById(productId);
        if (!product) throw new Error("No product found!");

        if (!MEASURE_UNITS.includes(updatedUnit))
          throw new Error("Not a valid unit");

        product.unit = updatedUnit;
        await product.save();
        return product;
      } catch (err: any) {
        if (err.message) console.log(err.message);
        return err;
      }
    },
  },
};
