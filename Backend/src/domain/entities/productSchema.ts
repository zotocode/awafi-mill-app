import mongoose, { Document } from "mongoose";


interface Description {
  header: string;
  content: string;
}

interface Variant {
  weight: string;
  inPrice: number;
  outPrice: number;
  stockQuantity: number;
}

// Define the Product interface
export default interface Product extends Document {
  _id:mongoose.Types.ObjectId
  name: string;
  descriptions: Description[];
  isListed: boolean;
  isDelete: boolean;
  subCategory: mongoose.Schema.Types.ObjectId | null;
  category: mongoose.Schema.Types.ObjectId | null;
  images: string[];
  variants: Variant[];
}



