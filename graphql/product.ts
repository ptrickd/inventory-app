//Mongoose
import mongoose from "mongoose";

//Models
import dbConnect from "../utils/dbConnect";
import Product from "../models/product.model";

//Constants
import { MEASURE_UNITS } from "../constants/measureUnits";

//Validation
import Joi from "joi";

dbConnect();

interface IProductInCategories {
  id: string;
  currentAmount: Number;
  previousAmount: Number;
  categoryId: String;
  position: Number;
}

interface ICreateProduct {
  name: string;
  categoryId: string;
  userId: string;
  unit: string;
  position: number;
}

interface IEditProduct {
  productId: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  categoryId: string;
  unit: string;
  position: number;
}

export const typeDef = `
    type Categories {
        currentAmount: Int
        previousAmount: Int
        categoryId: ID
        position: Int
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
            categoryId: String, 
            unit: String,
            position: Int,
            ): Product

        editProduct(
            productId:String, 
            name:String, 
            currentAmount:Int, 
            previousAmount:Int, 
            categoryId: String, 
            unit: String,
            position: Int,
            ): Product
            
        deleteProduct(productId: ID): Product
        saveAmountProduct(productId: ID, updatedAmount: Int, categoryId: ID): Product
        saveUnitProduct(productId: ID, updatedUnit: String): Product
    }
`;

export const resolvers = {
  Query: {
    products: async (_: any, _1: any, { user }: any) => {
      try {
        let products = [];
        if (!user) throw new Error("Not Authenticated");

        products = await Product.find({ userId: user.id });
        if (!products) throw new Error("Products not found");
        return products.map(({ id, categories, name, unit }: IProduct) => ({
          id,
          name,
          categories,
          unit,
        }));
      } catch (err: any) {
        console.error(err.message);
        return err;
      }
    },
    productsByCategory: async (_: any, { categoryId }: TIds, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");

        let products = await Product.find({ categoryId: categoryId });

        if (!products) throw new Error("No products found");

        return products.map(({ id, categories, name, unit }: IProduct) => ({
          id,
          name,
          categories,
          unit,
        }));
      } catch (err) {
        console.error(err);
        return err;
      }
    },
    numOfProducts: async (_: any, _1: any, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        return await Product.countDocuments();
      } catch (err: any) {
        console.error(err.message);
        return err;
      }
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      { name, categoryId, unit, position }: ICreateProduct,
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
        //Create first the category
        const categoryIdObj = new mongoose.Types.ObjectId(categoryId);
        const category = { categoryId: categoryIdObj, position };

        let product = await Product.create({
          name,
          categories: category,
          unit,
          userId: user.id,
        });
        return product;
      } catch (err: any) {
        console.error(err.message);
        return { error: err.message };
      }
    },
    editProduct: async (
      _: any,
      { productId, name, categoryId, unit, position }: IEditProduct,
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
        //No need to verify if category is already in
        editedProduct.name = name;
        editedProduct.unit = unit;

        //Add to categories array if categoryId is provided
        if (categoryId) {
          let categoryExisting: ISubCategory | null = null;

          const editedCategories: ISubCategory[] | [] =
            editedProduct.categories.map((category: ISubCategory) => {
              if (String(category.categoryId) === categoryId) {
                //return modified category object
                categoryExisting = { ...category, categoryId, position };
                return categoryExisting;
              } else return category;
            });
          //if category exist, modify this one
          if (categoryExisting) {
            editedProduct.categories = editedCategories;
          } else {
            //If that category does'nt exist create a new one

            const newCategory = {
              categoryId,
              currentAmount: 0,
              previousAmount: 0,
              position,
            };
            editedProduct.categories.push(newCategory);
          }
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
      { productId, updatedAmount, categoryId }: TIds,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        const product = await Product.findById(productId);
        if (!product) throw new Error("No product found!");
        //iterate through categories to find the corresponding categoryId

        const updatedCategories = product.categories.map(
          (category: IProductInCategories) => {
            if (category.categoryId.toString() === categoryId) {
              category.currentAmount = parseInt(updatedAmount);
              return category;
            } else return category;
          }
        );
        product.categories = updatedCategories;
        //save the amount
        await product.save();
        return product;
      } catch (err: any) {
        if (err.message) console.error(err.message);
        return err;
      }
    },

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
        console.log(product);
        await product.save();
        return product;
      } catch (err: any) {
        if (err.message) console.error(err.message);
        return err;
      }
    },
  },
};
