import mongoose, { Document } from "mongoose";

// Ensure that 'product' and 'IProduct' types align
export interface product {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
}