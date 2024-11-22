import mongoose from "mongoose";

export interface subCategoryCreationDTo {
    name: string;
    description: string;
    mainCategory:mongoose.Schema.Types.ObjectId | null;
    photo:string
    priority?:number
   
  }
  export interface subCategoryDTo {
    _id:mongoose.Types.ObjectId,
    name: string;
    description: string;
    mainCategory:mongoose.Schema.Types.ObjectId | null;
    isListed: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    priority:number;
    photo:string
  }
  mongoose
  
  