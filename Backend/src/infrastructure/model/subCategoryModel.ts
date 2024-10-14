import mongoose, { Schema, Document } from 'mongoose';
import IsubCategory  from '../../domain/entities/subCategorySchema'



// Define the Category schema
const SubCategorySchema: Schema = new Schema(
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
    mainCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MainCategory', // Optional: make this field required or not
      trim: true,
    },
    isListed: {
      type: Boolean,
      default: true, // Default value is true
    },
    isDeleted: {
      type: Boolean,
      default: false, // Default value is false
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
const SubCategory = mongoose.model<IsubCategory >('SubCategory', SubCategorySchema);

export default SubCategory;
