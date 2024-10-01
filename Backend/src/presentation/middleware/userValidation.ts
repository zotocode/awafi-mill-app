import Joi from 'joi';
import express from "express";

// validation schema
const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }), // Added validation for name
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  phone: Joi.number().required().messages({
    'any.required': 'Phone number is required',
  }), // Added validation for phone
});

// validation middleware
export const validateUserInput = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); 
};
