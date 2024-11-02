import mongoose, { Document } from 'mongoose';
import IProductSchema from "../domain/entities/productSchema";
import { ProductDTO } from '../domain/dtos/ProductDTO';

export interface Description {
  header: string;
  content: string;
}

export interface Variant {
  weight: string;
  inPrice: number;
  outPrice: number;
  stockQuantity: number;
}

export default interface Product  {
  _id:mongoose.Types.ObjectId ,
  sku?: string;
  ean?: string;
  name: string;
  descriptions: Description[];
  isListed: boolean;
  isDelete: boolean;
  category: mongoose.Types.ObjectId | null;
  subCategory: mongoose.Types.ObjectId | null;
  images: string[];
  variants: Variant[];
  createdAt?: Date;
  updatedAt?: Date;
}


export type ProductResponse={
  products:IProductSchema[],
  totalPages:number
}
export type ProductResponseDTO={
  products:ProductDTO[],
  totalPages:number
}
export type ProdutFormData={
 _id:mongoose.Types.ObjectId,
 sku:string,
 ean:string,
 name:string,
 isListed:boolean,
 images:string,
 variantWeight:string,
 variantInPrice:number,
 variantOutPrice:number,
 variantStockQuantity:number,
 createdAt:Date,
 updatedAt:Date
}