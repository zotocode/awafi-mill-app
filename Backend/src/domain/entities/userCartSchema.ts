// src/domain/entities/userCartSchema.ts
import mongoose, { Document } from "mongoose";

// Cart interface
export interface IUserCart extends Document {
  user: string | mongoose.Types.ObjectId;
  items: { product: mongoose.Types.ObjectId; variant: mongoose.Types.ObjectId; quantity: number }[];
}

