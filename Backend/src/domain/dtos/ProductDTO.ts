// src/domain/dto/product.dto.ts

import mongoose from "mongoose";



export interface ProductDTO {
  _id:string
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional
  weight: string;
  stockQuantity:number
  category: mongoose.Schema.Types.ObjectId; // Optional
  images?: string[];
  variants?: { size: string; price: number; stockQuantity: number }[]; // Optional
  isListed:boolean
}
export interface ProductCreationDTO {
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional
  weight: string;
  stockQuantity:number,
  categories: mongoose.Schema.Types.ObjectId; // Optional
  images?: string[];
  variants?: [{ size: string; price: number; stockQuantity: number }]; // Optional
  createdAt?: Date;
  updatedAt?: Date;
}