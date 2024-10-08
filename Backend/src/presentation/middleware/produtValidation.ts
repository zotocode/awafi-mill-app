import Joi from 'joi';
import express from "express";

// Validation schema for ProductCreationDTO
const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 100 characters',
    'any.required': 'Name is required',
  }),
  description: Joi.string().min(10).max(500).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description must not exceed 500 characters',
    'any.required': 'Description is required',
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive value',
    'number.precision': 'Price can have up to 2 decimal places',
    'any.required': 'Price is required',
  }),
  originalPrice: Joi.number().positive().precision(2).optional().messages({
    'number.base': 'Original price must be a number',
    'number.positive': 'Original price must be a positive value',
    'number.precision': 'Original price can have up to 2 decimal places',
  }),
  weight: Joi.string().required().messages({
    'string.base': 'Weight must be a string',
    'string.empty': 'Weight is required',
    'any.required': 'Weight is required',
  }),
  stockQuantity: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock quantity must be a number',
    'number.integer': 'Stock quantity must be an integer',
    'number.min': 'Stock quantity cannot be less than 0',
    'any.required': 'Stock quantity is required',
  }),
  status: Joi.string().valid('In Stock', 'Out of Stock').required().messages({
    'string.base': 'Status must be a string',
    'any.only': 'Status must be either "In Stock" or "Out of Stock"',
    'any.required': 'Status is required',
  }),
  categories: Joi.array().items(Joi.string().min(1)).optional().messages({
    'array.base': 'Categories must be an array of strings',
    'string.empty': 'Each category must have a value',
  }),
  images: Joi.array().items(Joi.string().uri()).optional().messages({
    'array.base': 'Images must be an array of URLs',
    'string.uri': 'Each image must be a valid URL',
  }),
  variants: Joi.array()
    .items(
      Joi.object({
        size: Joi.string().required().messages({
          'string.base': 'Size must be a string',
          'any.required': 'Size is required',
        }),
        price: Joi.number().positive().precision(2).required().messages({
          'number.base': 'Variant price must be a number',
          'number.positive': 'Variant price must be a positive value',
          'number.precision': 'Variant price can have up to 2 decimal places',
          'any.required': 'Variant price is required',
        }),
        stockQuantity: Joi.number().integer().min(0).required().messages({
          'number.base': 'Variant stock quantity must be a number',
          'number.integer': 'Variant stock quantity must be an integer',
          'number.min': 'Variant stock quantity cannot be less than 0',
          'any.required': 'Variant stock quantity is required',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Variants must be an array of objects',
    }),
});

// Validation middleware for ProductCreationDTO
export const validateProductInput = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
