import mongoose, { Document } from "mongoose";

// Review interface
export interface IReview extends Document {
  user: string | mongoose.Types.ObjectId;
  product: string | mongoose.Types.ObjectId;
  order: string | mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Ensure unique review per user, product, and order
reviewSchema.index({ user: 1, product: 1, order: 1 }, { unique: true });

export default reviewSchema;
