import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { Model } from "mongoose";

// Enum for Address Type
export enum AddressType {
    HOME = "home",
    WORK = "work",
}

// Interface for User Address
export interface IAddress {
    addressLine: string; // Building number or villa number
    locality: string; // Neighborhood or area
    cityDistrictTown: string; // Emirate or city
    state: string; // Country (e.g., United Arab Emirates)
    pincode: string; // Postal code (Emirate code)
    landmark: string; // Important for navigation in GCC cities
    floor: string; // Apartment number or floor number
    unit: string; // Flat number or office number
    addressType: AddressType; // Enum field for address type (home or work)
    alternativePhoneNumber: string; // Optional alternative phone number
}

// Extend user document for an eCommerce platform
export interface IUserDocument extends Document {
    email: string;
    userName: string;
    password: string;
    phone: number;
    address: IAddress[];
    isVerified: boolean; // New field to track user verification status
    isBlocked: boolean; // New field to track user blocking status
}

const addressSchema = new Schema<IAddress>(
    {
        addressLine: { type: String, required: true },
        locality: { type: String, required: true },
        cityDistrictTown: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        landmark: { type: String, required: true },
        floor: { type: String, default: null },
        unit: { type: String, default: null },
        addressType: {
            type: String,
            enum: Object.values(AddressType),
            required: true,
        },
        alternativePhoneNumber: { type: String, default: null },
    },
    { _id: false }
);

const userSchema: Schema = new Schema<IUserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            default: null,
        },
        phone: {
            type: Number,
            required: true,
        },
        address: [addressSchema],
        isVerified: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const userModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
    "users",
    userSchema
);
