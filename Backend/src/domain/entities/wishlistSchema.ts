import mongoose, { Document } from "mongoose";

// Wishlist interface
export interface IWishlist extends Document {
  user: string | mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];  
}

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]  
}, {
  timestamps: true  
});

export default wishlistSchema;
