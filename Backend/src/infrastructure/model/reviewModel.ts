import mongoose, { Model, Schema } from "mongoose";
import { IReview } from "../../domain/entities/reviewSchema";

const reviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true }, // New field added
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  status: { 
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending", 
  },
}, {
  timestamps: true
});

reviewSchema.index({ user: 1, product: 1, order: 1 }, { unique: true });

export const ReviewModel: Model<IReview> = mongoose.model<IReview>("Review", reviewSchema);
