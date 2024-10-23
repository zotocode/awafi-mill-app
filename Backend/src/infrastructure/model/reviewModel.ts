import mongoose, { Model, Schema } from "mongoose";
import { IReview } from "../../domain/entities/reviewSchema";

const reviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" }
}, {
  timestamps: true
});

export const ReviewModel: Model<IReview> = mongoose.model<IReview>("Review", reviewSchema);
