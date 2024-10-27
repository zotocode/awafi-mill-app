import mongoose, { Document } from "mongoose";

// Review interface
export interface IReview extends Document {
  user: string | mongoose.Types.ObjectId;
  product: string | mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" }
}, {
  timestamps: true  
});

export default reviewSchema;
