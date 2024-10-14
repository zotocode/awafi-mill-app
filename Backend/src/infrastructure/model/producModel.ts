import mongoose, { Schema } from 'mongoose';
import Product  from '../../domain/entities/productSchema';
import { ref, required } from 'joi';

// Define the structure for product descriptions


// Create the product schema
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  descriptions: [{
    header: { type: String, required: true },
    content: { type: String, required: true }
  }],
  isListed: { 
    type: Boolean,
    default: true,
    required: true 
  },
  isDelete: { 
    type: Boolean,
    default: false,
    required: true 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainCategory',
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  images: [
    { type: String, required: true }
  ],
  variants: [
    {
      weight: { type: String, required: true },
      price: { type: Number, required: true },
      stockQuantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

// Export the Product model
export const ProductModel = mongoose.model<Product>('Product', productSchema);