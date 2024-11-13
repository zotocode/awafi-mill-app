import { ObjectId } from "mongoose";
// src/domain/dtos/WishlistDTO.ts

export interface WishlistDTO {
    userId: string;
    items: {
        productId: string;
        variantId: string; 
    }[];
}

export interface AddToWishlistDTO {
    userId: string;
    variantId: string;
    productId: string;
}

export interface RemoveFromWishlistDTO {
    userId: string;
    productId: string;
    variantId: string; 
}


export interface IWishlistReturnDTO {
  productId: ObjectId;
  variantId: ObjectId;
  images: string[];
  name: string;
  weight: string;
  inPrice: number;
  outPrice: number;
  stockQuantity: number;
  rating: number;
}
