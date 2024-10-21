import mongoose, { Document, Schema } from "mongoose";

interface IProperty {
  property_name: string;
  property_type: string;
  contract_purpose: string;
  contract_mode: string;
  contract_start_date: Date;
  contract_end_date?: Date;
  total_units: number;
  available_units: number;
  contract_status: "Active" | "Pending Termination" | "Terminated";
}

export interface IOwner extends Document {
  owner_name: string;
  owner_type: "Brokerage" | "Asset Management"; // Field to differentiate owner type
  owner_sub_type: "Individual" | "Company"; // Field to specify Individual or Company
  contact_number: string;
  email: string;
  properties: IProperty[];
}

const PropertySchema: Schema = new mongoose.Schema({
  property_name: { type: String, required: true },
  property_type: { type: String, required: true },
  contract_purpose: { type: String, required: true },
  contract_mode: { type: String, required: true },
  contract_start_date: { type: Date, required: true },
  contract_end_date: { type: Date },
  total_units: { type: Number, required: true },
  available_units: { type: Number, required: true },
  contract_status: {
    type: String,
    enum: ["Active", "Pending Termination", "Terminated"],
    required: true,
  },
});

// Main Owner Schema
const OwnerSchema: Schema = new mongoose.Schema({
  owner_name: { type: String, required: true },
  owner_type: {
    type: String,
    enum: ["Brokerage", "Asset Management"],
    required: true,
  },
  owner_sub_type: {
    type: String,
    enum: ["Individual", "Company"],
    required: true,
  },
  contact_number: { type: String, required: true },
  email: { type: String, required: true },
  properties: [PropertySchema],
});

export const Owner = mongoose.model<IOwner>("Owner", OwnerSchema);
