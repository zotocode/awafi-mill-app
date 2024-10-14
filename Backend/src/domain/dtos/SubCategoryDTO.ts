import mongoose from "mongoose";

export interface subCategoryCreationDTo {
    name: string;
    description: string;
    mainCategory:mongoose.Schema.Types.ObjectId | null;
    isListed?:boolean
  }
  export interface subCategoryDTo {
    _id:string,
    name: string;
    description: string;
    mainCategory:mongoose.Schema.Types.ObjectId | null;
    isListed: string;
    isDeleted: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  