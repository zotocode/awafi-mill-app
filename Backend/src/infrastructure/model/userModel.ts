import mongoose, { Schema, Document, Model } from "mongoose";

// Define the user document interface
export interface IuserDocument extends Document {
  _id: string;  // We can cast the ObjectId to a string later
  name: string;
  email: string;
  phone:number;
  password: string;
}

// Define the user schema
const userSchema: Schema<IuserDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone:{
        type: Number,
        required: false,
    },
    password: {
      type: String,
      default: null,
    }
  },

);

// Create and export the model
export const userModel: Model<IuserDocument> = mongoose.model<IuserDocument>(
  "users1",
  userSchema
);
