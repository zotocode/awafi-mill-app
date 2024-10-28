import mongoose, { Schema, Document, Model } from "mongoose";

// Define the address document interface
export interface IAddressDocument extends Document {
  userId: string; // Reference to the user
  addressLine1: string;
  addressLine2?: string; // Optional field
  city: string;
  postalCode: string;
  country: string;
}

// Define the address schema
const addressSchema: Schema<IAddressDocument> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: false, // Optional field
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
);

// Export the address model
export const addressModel: Model<IAddressDocument> = mongoose.model<IAddressDocument>("Address", addressSchema);
