import { Document } from "mongoose";

// Define interfaces for nested types
interface Image {
  url: string;
  altText?: string;
}

interface Variant {
  size: string;
  price: number;
  stockQuantity: number;
}

interface StockStatus {
  quantity: number;
  status: 'In Stock' | 'Out of Stock';
}


// Define the Product interface that extends Document
export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional
  weight: string;
  stockStatus: StockStatus;
  categories?: string[]; // Optional
  images?: string[]; // Optional
  variants?: Variant[]; // Optional
  createdAt?: Date; // Automatically handled by mongoose
  updatedAt?: Date; // Automatically handled by mongoose
}
Document