import mongoose, { Types, Model, Schema } from "mongoose";

//Documents definitions
interface IUser {
  email: string;
  password: string;
  theme: string;
  isWizardEnabled: boolean;
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
  theme: { type: String, required: true, default: "light" },
  isWizardEnabled: { type: Boolean, required: true, default: true },
});

export default mongoose.models.User || mongoose.model<IUser>("User", schema);
