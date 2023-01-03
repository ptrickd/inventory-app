import mongoose from "mongoose";

interface IReport {
  userId: String;
  dateEndingCycle: Date;
  products?: IProduct[];
  dateSubmitted?: Date;
  hasBeenSubmitted: Boolean;
  dateCreated: Date;
}

interface IProduct {
  productId: String;
  amount: Number;
  name: String;
  categoryId: String;
}

const productSchema = new mongoose.Schema<IProduct>({
  productId: String,
  amount: Number,
  name: String,
  categoryId: String,
});

const reportSchema = new mongoose.Schema<IReport>({
  userId: {
    type: String,
    required: true,
  },
  dateEndingCycle: {
    type: Date,
    required: true,
  },
  products: [productSchema],
  dateSubmitted: {
    type: Date,
  },
  hasBeenSubmitted: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Report ||
  mongoose.model<IReport>("Report", reportSchema);
