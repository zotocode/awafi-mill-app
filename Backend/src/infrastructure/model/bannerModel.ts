import mongoose, { Schema, Model } from "mongoose";
import { IBannerItem, IBanner } from "../../domain/entities/bannerSchema";

// Define the schema for a single banner item
const bannerItemSchema = new Schema<IBannerItem>({
  imageUrl: { type: String, required: true },     // URL of the banner image
  listed: { type: Boolean, required: true },      // Whether the banner is listed or active
  startDate: { type: Date, required: false },     // Optional start date for offer banners
  endDate: { type: Date, required: false },       // Optional end date for offer banners
  name: { type: String, required: true },         // Added name field
});

// Define the main banner schema
const bannerSchema = new Schema<IBanner>({
  offerBanners: [bannerItemSchema],              // Array of offer banners
  welcomeBanners: [bannerItemSchema],            // Array of welcome banners
  collectionBanners: [bannerItemSchema],         // Array of collection banners (new)
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt timestamps
});

// Create the Banner model
export const BannerModel: Model<IBanner> = mongoose.model<IBanner>("Banner", bannerSchema);
