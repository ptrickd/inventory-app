import mongoose from "mongoose";

interface IProductInCategories {
  currentAmount: Number;
  previousAmount: Number;
  categoryId: String;
  position: Number;
}

interface IProduct {
  name: String;
  categories: IProductInCategories[] | [];
  userId: String;
  unit: String;
}

const categoriesSchema = new mongoose.Schema<IProductInCategories>({
  currentAmount: {
    type: Number,
    default: 0,
  },
  previousAmount: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
});

const schema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  categories: [categoriesSchema],
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", schema);
