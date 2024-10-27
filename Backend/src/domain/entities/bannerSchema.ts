import mongoose, { Document } from "mongoose";

// Define an interface for a single banner item (used in offerBanners, welcomeBanners, and collectionBanners)
export interface IBannerItem {
  imageUrl: string;         // URL of the banner image
  listed: boolean;          // Whether the banner is listed or active
  startDate?: Date;         // Optional start date (for offer banners)
  endDate?: Date;           // Optional end date (for offer banners)
  name: string;             // Name for the banner
}

// Define the main interface for the Banner document
export interface IBanner extends Document {
  _id: mongoose.Types.ObjectId;         // Unique identifier for the banner document
  offerBanners: IBannerItem[];          // Array of offer banners
  welcomeBanners: IBannerItem[];        // Array of welcome banners
  collectionBanners: IBannerItem[];     // Array of collection banners (new)
  createdAt: Date;                      // Creation date
  updatedAt: Date;                      // Last update date
}
