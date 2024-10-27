import mongoose, { Document } from "mongoose";
// Define the interface for the Category document
export default interface IsubCategory extends Document {
    _id:mongoose.Types.ObjectId;
    name: string;
    description: string;
    mainCategory: mongoose.Schema.Types.ObjectId | null;
    isListed: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  

  