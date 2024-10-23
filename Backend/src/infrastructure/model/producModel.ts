import mongoose, { Schema } from 'mongoose';
import Product  from '../../domain/entities/productSchema';
import { ref, required } from 'joi';

// Define the structure for product descriptions


// Create the product schema
const productSchema = new Schema<Product>({
  ID:{type:String,required:false},
  sku:{type:String,required:false},
  ean:{type:String,required:false},
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
    required: false
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: false
  },
  images: [
    { type: String, required: true }
  ],
  variants: [
    {
      weight: { type: String, required: false },
      inPrice: { type: Number, required: false },
      outPrice: { type: Number, required: false },
      stockQuantity: { type: Number, required: false }
    }
  ]
}, { timestamps: true });

// Export the Product model
export const ProductModel = mongoose.model<Product>('Product', productSchema);