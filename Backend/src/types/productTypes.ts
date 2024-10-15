
import mongoose, { Document } from "mongoose";


interface Description {
  header: string;
  content: string;
}

interface Variant {
  weight: string;
  price: number;
  stockQuantity: number;
}

// Define the Product interface
export default interface Product {
  _id:string,
  name: string;
  description: Description[];
  isListed: boolean;
  isDelete: boolean;
  category: mongoose.Schema.Types.ObjectId | null;
  images: string[];
  variants: Variant[];
}



