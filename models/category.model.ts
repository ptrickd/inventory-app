import mongoose from "mongoose";

interface ICategory {
  name: String;
  userId: String;
}

const schema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const Category =
  mongoose.models.Category || mongoose.model<ICategory>("Category", schema);
