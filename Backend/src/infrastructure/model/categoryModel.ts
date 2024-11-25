import mongoose, { Schema, Document } from 'mongoose';
import Category from '../../domain/entities/categorySchema'


// Define the Category schema
const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Optional: Ensure that category names are unique
    },
    description: {
      type: String,
      required: false, // Optional: make this field required or not
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
    isListed: {
      type: Boolean,
      default: true, // Default value is true
    },
    isDeleted: {
      type: Boolean,
      default: false, // Default value is false
    },
    priority: {
      type: Number,
      default: 101, 
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
const Category = mongoose.model<Category>('MainCategory', CategorySchema);

export default Category;
