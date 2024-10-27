import * as yup from 'yup';

// Validation schema for Description
const descriptionSchema = yup.object().shape({
  header: yup
    .string()
    .required('Header is required')
    .min(3, 'Header must be at least 3 characters')
    .max(100, 'Header must not exceed 100 characters'),
  content: yup
    .string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters')
    .max(1000, 'Content must not exceed 1000 characters')
});

// Validation schema for Variant
const variantSchema = yup.object().shape({
  weight: yup
    .string()
    .required('Weight/Unit is required')
    .matches(/^[\d.]+\s*[a-zA-Z]+$/, 'Weight must include a number and unit (e.g., "500 g", "1 kg")'),
  inPrice: yup
    .number()
    .typeError('In Price must be a number')
    .required('In Price is required')
    .min(0, 'In Price must be greater than or equal to 0')
    .test('decimal', 'In Price can have maximum 2 decimal places', value => 
      value ? Number.isInteger(value * 100) : true
    ),
  outPrice: yup
    .number()
    .typeError('Out Price must be a number')
    .required('Out Price is required')
    .min(0, 'Out Price must be greater than or equal to 0')
    .test('decimal', 'Out Price can have maximum 2 decimal places', value => 
      value ? Number.isInteger(value * 100) : true
    )
    .test('greater-than-in-price', 'Out Price must be greater than In Price', 
      function(value) {
        return value ? value > this.parent.inPrice : false;
    }),
  stockQuantity: yup
    .number()
    .typeError('Stock Quantity must be a number')
    .required('Stock Quantity is required')
    .integer('Stock Quantity must be a whole number')
    .min(0, 'Stock Quantity must be greater than or equal to 0')
});

// Main validation schema
export const productValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must not exceed 100 characters'),
  
  category: yup
    .string()
    .required('Main category is required'),
  
  subCategory: yup
    .string()
    .required('Sub category is required'),
  
  descriptions: yup
    .array()
    .of(descriptionSchema)
    .min(1, 'At least one description is required')
    .required('Descriptions are required'),
  
  variants: yup
    .array()
    .of(variantSchema)
    .min(1, 'At least one variant is required')
    .required('Variants are required'),
  
    images: yup
    .array()
    .of(
      yup.mixed<File>()
        .test('fileSize', 'Image must be less than 5MB', (value) => {
          // Check if value is not present or if it's a string (for example, when editing and no new image is uploaded)
          if (!value || typeof value === 'string') return true;
          // Type assertion to File type to access 'size'
          return (value as File).size <= 5000000;
        })
        .test('fileType', 'Unsupported file format', (value) => {
          if (!value || typeof value === 'string') return true;
          // Type assertion to File type to access 'type'
          return ['image/jpeg', 'image/png', 'image/gif'].includes((value as File).type);
        })
    )
    .min(1, 'At least one image is required')
  
});

// Helper function to validate a single field
export const validateField = async (
  fieldName: string, 
  value: any, 
  schema: any
): Promise<string | null> => {
  try {
    await schema.validateAt(fieldName, value);
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return 'Validation failed';
  }
};