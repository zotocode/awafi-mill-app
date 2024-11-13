import mongoose from "mongoose";

// domain/dtos/CheckoutDTO.ts

// Product Item DTO to represent individual products within checkout items
export interface ProductItemDTO {
  product: string;
  variant: string;
  quantity: number;
}

// Shipping Address structure for use in both DTOs
export interface ShippingAddressDTO {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Checkout DTO for frontend interactions
export interface CheckoutDTO {
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
  time: Date;
  shippingAddress: ShippingAddressDTO;
  transactionId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

// CheckoutCreateDTO for database or backend processing
export interface CheckoutCreateDTO {
  user: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
  orderPlacedAt: Date;
  deliveredAt: Date;
  cart: mongoose.Types.ObjectId;
  items: { 
    product: mongoose.Types.ObjectId; 
    variant: mongoose.Types.ObjectId; 
    quantity: number; 

  }[];
  shippingAddress: ShippingAddressDTO;
  transactionId:string;
  paymentStatus:"pending" | "completed" | "failed"
  
}

// Order Summary for summarizing order data
export interface OrderSummary {
  totalCount: number;
  totalAmount: number;
  orderStatus: 'delivered' | 'shipped' | 'returned' | 'processing';
}

// Revenue Summary for tracking revenue details
export interface RevenueSummary {
  totalRevenue: number;
  count: number;
  day: number;
}
