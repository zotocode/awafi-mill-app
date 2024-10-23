import mongoose, { Document } from 'mongoose';
import IProductSchema from "../domain/entities/productSchema";
import { ProductDTO } from '../domain/dtos/ProductDTO';

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

export default interface Product  {
  _id:mongoose.Types.ObjectId ,
  ID?: string;
  sku?: string;
  Ean?: string;
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