import mongoose from "mongoose";

export interface OrderType {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: ItemsList[];
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

  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentFailureReason?: string;
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  returnStatus: 'not_requested' | 'requested' | 'approved' | 'rejected';
  refundStatus: 'not_initiated' | 'initiated' | 'completed' | 'failed';
  couponCode: string;
  discountAmount: number;
  paymentCompletedAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  trackingId?:string;
  userDetails:any;
  productDetails:any;
  }
  
  export type ItemsList={
    productId:string;
    variantId: string;
    quantity: number;
    returnQuantity: number; // Number of items returned
    returnStatus: "not_requested" | "requested" | "approved" | "rejected";
    returnReason: string; // Reason for return
    refundAmount: number; // Amount refunded for this item
    name: string;
    weight: string;
    price: number;
    images: string;

   }

   
   export type OrderStatus ='processing' | 'shipped' | 'delivered' | 'cancelled'