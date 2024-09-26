import mongoose, { Schema, Document } from 'mongoose';
import {IProduct} from '../../types/commonTypes'


// Define the schema
const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Create the Mongoose model
export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
