import mongoose from "mongoose";
import { IProductDetails } from "./CartDTO";

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
  userId:string;
  paymentMethod: 'COD' | 'Tabby' | 'Stripe';
  shippingAddress: ShippingAddressDTO;
  currency:string
  transactionId:string
  amount:number
  paymentStatus:"pending" | "completed" | "failed"

}

// CheckoutCreateDTO for database or backend processing
export interface CheckoutCreateDTO {
  user: mongoose.Types.ObjectId;
  cartId?: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: 'COD' | 'Tabby' | 'Stripe';
  orderPlacedAt: Date;
  items:{ 
    productId: string;
    variantId: string;
    name: string;
    weight: string;
    quantity: number;
    price:number;
    images: string;
  }[];
  shippingAddress: ShippingAddressDTO;
  paymentStatus:"pending" | "completed" | "failed"
  transactionId:string
  deliveredAt:Date
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

