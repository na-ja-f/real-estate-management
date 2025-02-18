import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Manager" | "Agent";
  isBlocked: true | false;
}

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Agent", enum: ["Admin", "Manager", "Agent"] },
  isBlocked: { type: Boolean, default: false },
});

export const User = mongoose.model<IUser>("User", UserSchema);
