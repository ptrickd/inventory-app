import mongoose, { Types, Model, Schema } from "mongoose";

//Documents definitions
interface IUser {
  email: string;
  password: string;
  theme: string;
}

const schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  theme: { type: String, required: true, default: "Light" },
});

export default mongoose.models.User || mongoose.model<IUser>("User", schema);
