import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Cart Items
export interface ICartItem {
  productId: mongoose.Schema.Types.ObjectId; // Product reference
  quantity: number;
}

// Interface for Cart Document
export interface ICartDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId; // User reference
  items: ICartItem[];
}

// Schema for Cart Items
const cartItemSchema: Schema = new Schema<ICartItem>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

// Schema for Cart
const cartSchema: Schema = new Schema<ICartDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
});

// Cart Model
export const cartModel: Model<ICartDocument> = mongoose.model<ICartDocument>(
  "Cart",
  cartSchema
);
