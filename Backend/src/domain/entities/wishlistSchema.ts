import mongoose, { Document } from "mongoose";

// Wishlist interface
export interface IWishlist extends Document {
  user: string | mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    variantId: mongoose.Types.ObjectId;
  }[];
}
