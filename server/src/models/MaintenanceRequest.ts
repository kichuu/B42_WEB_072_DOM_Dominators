import { Schema, model, Document } from "mongoose";

interface MaintenanceRequest extends Document {
  tenant: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  issueType: string;  // e.g., plumbing, electrical, etc.
  description: string;
  urgency: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const MaintenanceRequestSchema = new Schema<MaintenanceRequest>({
  tenant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  urgency: { type: String, enum: ["low", "medium", "high"], required: true },
  status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<MaintenanceRequest>("MaintenanceRequest", MaintenanceRequestSchema);
