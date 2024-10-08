// src/infrastructure/model/cartModel.ts
import mongoose, { Model, Schema } from "mongoose";
import { IUserCart } from "../../domain/entities/userCartSchema";

const cartSchema = new Schema({
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

export const CartModel: Model<IUserCart> = mongoose.model<IUserCart>("Cart", cartSchema);
