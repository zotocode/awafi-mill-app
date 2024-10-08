import mongoose, { Document } from "mongoose";



interface Variant {
  size: string;
  price: number;
  stockQuantity: number;
}

interface StockStatus {
  quantity: number;
}

// Define the Product interface that extends Document
export interface Product extends Document {
  _id: string; // MongoDB ID
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional original price for discounts
  weight: string;
  stockQuantity:number;
  category: mongoose.Schema.Types.ObjectId; // Reference to Category
  images?: string[]; // Use Image interface for structured image data
  variants?: Variant[]; // Optional product variants
  createdAt?: Date; // Automatically handled by mongoose
  updatedAt?: Date; // Automatically handled by mongoose
  isListed: boolean; // Indicates if the product is listed
}
