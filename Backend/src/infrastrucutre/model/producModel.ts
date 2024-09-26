import mongoose, { Schema, Model } from 'mongoose';
import { IProduct } from '../../domain/entities/productSchema'; 

// Define the schema
const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Ensure ProductModel is correctly typed with Document
export const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
