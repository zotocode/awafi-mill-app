// src/infrastructure/model/wishlistModel.ts
import mongoose, { Model, Schema } from "mongoose";
import { IWishlist } from "../../domain/entities/wishlistSchema";

const wishlistSchema = new Schema<IWishlist>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      variantId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Product.variants" }
    }
  ]
}, {
  timestamps: true
});

export const WishlistModel: Model<IWishlist> = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
