import mongoose, { Document } from 'mongoose';

interface Description {
  header: string;
  content: string;
}

interface Variant {
<<<<<<< HEAD
  _id?:mongoose.Types.ObjectId
=======
  _id?: mongoose.Types.ObjectId;
>>>>>>> upstream/develop
  weight: string;
  inPrice: number;
  outPrice: number;
  stockQuantity: number;
}

export default interface Product extends Document {
  _id:mongoose.Types.ObjectId
  sku: string;
  ean: string;
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
  inCart?:boolean;
  inWishlist?:boolean;
  SubCategoryData?:any;
  MainCategoryData?:any
}
