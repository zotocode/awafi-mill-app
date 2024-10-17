import mongoose, { Schema, Document, Model } from "mongoose";

// Define the user document interface
export interface IuserDocument extends Document {
  _id: string;  // We can cast the ObjectId to a string later
  name: string;
  email: string;
  phone:number;
  isBlocked:boolean;
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
    isBlocked: {
      type: Boolean,
      default: false, 
    },

    password: {
      type: String,
      default: null,
    }
  },

);

export  const userModel:Model<IuserDocument> =mongoose.model<IuserDocument>("user",userSchema)
