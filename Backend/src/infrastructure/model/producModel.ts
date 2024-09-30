import mongoose, { Schema } from 'mongoose';
import {Product} from '../../domain/entities/productSchema'


// Create the product schema
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // Optional original price for discounts
  weight: { type: String, required: true },
  stockStatus: {
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['In Stock', 'Out of Stock'], required: true }
  },
  categories: [{ type: String }], // Optional product categories
  images: [
    { type: String, required: true },
      
    
  ],
  variants: [
    {
      size: { type: String, required: true }, // E.g., small, medium, large
      price: { type: Number, required: true },
      stockQuantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the Product model
export const ProductModel = mongoose.model<Product>('Product', productSchema);
