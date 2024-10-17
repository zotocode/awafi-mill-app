// src/domain/dto/product.dto.ts

import mongoose from "mongoose";

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


export interface ProductDTO {
  _id:mongoose.Types.ObjectId
  name: string;
  descriptions: Description[];
  category: mongoose.Schema.Types.ObjectId | null;
  subCategory: mongoose.Schema.Types.ObjectId | null;
  images: string[];
  variants: Variant[];
  isListed:boolean
}
export interface ProductCreationDTO {
  name: string;
  descriptions: Description[];
  isListed: boolean;
  category: mongoose.Schema.Types.ObjectId | null;
  subCategory: mongoose.Schema.Types.ObjectId | null;
  images: string[];
  variants: Variant[];
}