import { Document } from "mongoose";
// Define the interface for the Category document
export default interface Category extends Document {
    name: string;
    description: string;
    isListed: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  