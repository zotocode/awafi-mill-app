
  import mongoose from "mongoose";
import { IProductDetails } from "./CartDTO";
import { ICheckoutItem } from "../entities/checkoutSchema";

// OrderDTO.ts
export interface CreateOrderDTO {
    user: string;
    cart: string;
    items: ItemsListDTO[];
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    transactionId?: string;
    amount: number;
    currency?: string;
  
    shippingAddress: {
      fullName: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postalCode: string;
      country: string;
      phone: string;
    };
    billingAddress: {
      fullName: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postalCode: string;
      country: string;
      phone: string;
    };
  
    couponCode?: string;
    discountAmount?: number;
  }

  export type ItemsListDTO={
    productId: string;
    variantId: string;
    name: string;
    weight: string;
    quantity: number;
    inPrice: number;
    outPrice: number;
    images: string;
    stockQuantity: number;
    rating: number;
   
  }
  
  export interface OrderDTO {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    items: ICheckoutItem[];
    paymentMethod: 'COD' | 'Tamara' | 'Stripe' | 'Tabby';
    transactionId: string;
    amount: number;
    currency: string;
    cancellationReason?:string;
  
    shippingAddress?: {
      fullName: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postalCode: string;
      country: string;
      phone: string;
    };
    billingAddress?: {
      fullName: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postalCode: string;
      country: string;
      phone: string;
    };
  
    paymentStatus?: 'pending' | 'completed' | 'failed';
    paymentFailureReason?: string;
    orderStatus?: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    returnStatus?: 'not_requested' | 'requested' | 'approved' | 'rejected';
    refundStatus?: 'not_initiated' | 'initiated' | 'completed' | 'failed';
    couponCode?: string;
    discountAmount: number;
    paymentCompletedAt?: Date;
    deliveredAt: Date;
    createdAt: Date;
    updatedAt: Date;
    trackingId?:string;
    userDetails?:any;
    productDetails?:any;
    hasReturnRequest?:boolean;
    orderPlacedAt:Date
  }
  
  export interface UpdateOrderStatusDTO {
    orderId: mongoose.Types.ObjectId;
    userId?: mongoose.Types.ObjectId;
    trackingId?:string;
    paymentStatus?: 'pending' | 'completed' | 'failed';
    orderStatus?: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    returnStatus?: 'not_requested' | 'requested' | 'approved' | 'rejected';
    refundStatus?: 'not_initiated' | 'initiated' | 'completed' | 'failed';
  }
  