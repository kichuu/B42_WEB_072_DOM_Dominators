import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "tenant" | "landlord";
  properties: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["tenant", "landlord"], required: true },
  properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
});

export default mongoose.model<IUser>("User", UserSchema);
