import { Document } from "mongoose";
// Define the interface for the Category document
export default interface ICategory extends Document {
    _id:string;
    name: string;
    description: string;
    isListed: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  