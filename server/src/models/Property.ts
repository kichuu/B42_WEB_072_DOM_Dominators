import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  landlord: mongoose.Types.ObjectId;
  address: string;
  tenants: mongoose.Types.ObjectId[];
}

const PropertySchema = new Schema<IProperty>({
  landlord: { type: Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String, required: true },
  tenants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model<IProperty>("Property", PropertySchema);
