import mongoose from "mongoose";

export interface OrderType {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    cart: mongoose.Types.ObjectId;
    items: ItemsList[];
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
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
    returnStatus?: 'not_requested' | 'requested' | 'approved' | 'rejected';
    refundStatus?: 'not_initiated' | 'initiated' | 'completed' | 'failed';
    couponCode?: string;
    discountAmount: number;
    paymentCompletedAt?: Date;
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ItemsList={
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
   export type OrderStatus ='processing' | 'shipped' | 'delivered' | 'cancelled'