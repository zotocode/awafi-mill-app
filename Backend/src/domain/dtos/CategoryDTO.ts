import mongoose from "mongoose";

export interface categoryCreationDTo {
  name: string;
  description: string;
}
export interface categoryDTo {
  _id:mongoose.Types.ObjectId,
  name: string;
  description: string;
  isListed: string;
  isDeleted: string;
  createdAt: Date;
  updatedAt: Date;
}
