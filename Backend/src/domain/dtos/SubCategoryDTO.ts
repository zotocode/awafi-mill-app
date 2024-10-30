import mongoose from "mongoose";

export interface subCategoryCreationDTo {
    name: string;
    description: string;
    mainCategory:mongoose.Schema.Types.ObjectId | null;
   
  }
  export interface subCategoryDTo {
    _id:mongoose.Types.ObjectId,
    name: string;
    description: string;
    mainCategory:mongoose.Schema.Types.ObjectId | null;
    isListed: string;
    isDeleted: string;
    createdAt: Date;
    updatedAt: Date;
  }
  mongoose
  
  