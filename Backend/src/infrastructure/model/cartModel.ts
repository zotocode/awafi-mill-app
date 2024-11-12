// src/infrastructure/model/cartModel.ts
import mongoose, { Model } from "mongoose";
import { IUserCart } from "../../domain/entities/userCartSchema";

const userCartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true ,unique: true},
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      variant: { type: mongoose.Schema.Types.ObjectId, ref: "Product.variants", required: true }, // Reference to the variant ID
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, {
  timestamps: true
});

export const CartModel: Model<IUserCart> = mongoose.model<IUserCart>('Cart', userCartSchema);
export default userCartSchema;


