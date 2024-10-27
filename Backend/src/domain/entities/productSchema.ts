import mongoose, { Document } from 'mongoose';

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

export default interface Product extends Document {
  ID?: string;
<<<<<<< HEAD
  sku?: string;
  ean?: string;
=======
  sku: string;
  ean: string;
>>>>>>> upstream/develop
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
