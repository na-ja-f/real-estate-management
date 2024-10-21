import mongoose, { Document, Schema } from "mongoose";

enum PropertyType {
  Residential = "Residential",
  Commercial = "Commercial",
  Both = "Both",
}

enum PropertyMode {
  Sales = "Sales",
  Leasing = "Leasing",
}

enum ContractType {
  Exclusive = "Exclusive",
  NonExclusive = "Non-Exclusive",
}

interface IProperty extends Document {
  property_name: string;
  property_type: PropertyType;
  location: ILocation;
  mode: PropertyMode;
  contract_type: ContractType;
  expected_commission: IExpectedCommission;
  marketing_kit: IMarketingKit;
  payment_plan: string;
}

interface ILocation {
  area: string;
  google_maps_link: { lat: number; lng: number };
  zone_number: number;
  street_number: number;
  building_number: number;
}

interface IExpectedCommission {
  rate: number;
  type: string;
  amount: number;
}

interface IMarketingKit {
  posts_ads: string[];
  photos: string[];
  floor_plans: string;
}

// Property Schema
const PropertySchema: Schema = new Schema(
  {
    property_name: { type: String, required: true },
    property_type: {
      type: String,
      enum: Object.values(PropertyType),
      required: true,
    },
    location: {
      area: { type: String, required: true },
      google_maps_link: {
        lat: { type: Number, required: true }, // Latitude as a number
        lng: { type: Number, required: true }, // Longitude as a number
      },
      zone_number: { type: Number, required: true },
      street_number: { type: Number, required: true },
      building_number: { type: Number, required: true },
    },
    mode: { type: String, enum: Object.values(PropertyMode), required: true },
    contract_type: {
      type: String,
      enum: Object.values(ContractType),
      required: true,
    },
    expected_commission: {
      rate: { type: Number, required: true },
    },
    photos: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.model<IProperty>("Property", PropertySchema);
