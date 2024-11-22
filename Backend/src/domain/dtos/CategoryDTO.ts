import mongoose from "mongoose";

export interface categoryCreationDTo {
  name: string;
  description: string;
  photo?:string
  priority?:number
}
export interface categoryDTo {
  _id:mongoose.Types.ObjectId,
  name: string;
  description: string;
  photo:string;
  isListed: Boolean;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
  priority:number
}
