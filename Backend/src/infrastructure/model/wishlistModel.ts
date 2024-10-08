// src/infrastrucutre/model/wishlistModel.ts
import mongoose, { Model, Schema } from "mongoose";
import { IWishlist } from "../../domain/entities/wishlistSchema";

const wishlistSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, {
  timestamps: true
});

export const WishlistModel: Model<IWishlist> = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
