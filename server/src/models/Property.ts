import mongoose, { Schema, model, Document } from "mongoose";

interface Property extends Document {
  name:string;
  landlord: Schema.Types.ObjectId;
  address: string;
  tenants: Schema.Types.ObjectId[];
  maintenanceRequests: Schema.Types.ObjectId[];
  rentAmount: number
}

const PropertySchema = new Schema<Property>({ 
  name: { type: String, required: false },
  landlord: { type: Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String, required: true },
  tenants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  maintenanceRequests: [{ type: Schema.Types.ObjectId, ref: "MaintenanceRequest" }],
  rentAmount: { type: Number, required: true },
});

export default model<Property>("Property", PropertySchema);
