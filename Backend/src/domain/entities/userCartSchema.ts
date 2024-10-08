// src/domain/entities/userCartSchema.ts
import mongoose, { Document } from "mongoose";

// Cart interface
export interface IUserCart extends Document {
  user: string | mongoose.Types.ObjectId;
  items: { product: mongoose.Types.ObjectId; quantity: number }[];  
}

const userCartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, {
  timestamps: true  
});

export default userCartSchema;
