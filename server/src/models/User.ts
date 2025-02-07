import mongoose, { Schema, Document } from "mongoose";

export interface IRentDue {
  _id: mongoose.Types.ObjectId;
  amount: number;
  dueDate: Date;
  paid: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "tenant" | "landlord";
  properties: mongoose.Types.ObjectId[];
  rentDues: IRentDue[];


}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["tenant", "landlord"], required: true },
  properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  rentDues: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      amount: { type: Number, required: true },
      dueDate: { type: Date, required: true },
      paid: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model<IUser>("User", UserSchema);
