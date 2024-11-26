import { Types,Document } from "mongoose";

export interface ICheckoutItem {
  productId?: Types.ObjectId;
  variantId?: Types.ObjectId;
  quantity: number;
  returnStatus?: "not_requested" | "requested" | "approved" | "rejected";
  returnReason?: string; // Reason for return
  refundAmount?: number; // Amount refunded for this item
  name: string;
  weight: string;
  price:number
  images: string;
  stockQuantity: number;
  rating?: number;
}

export interface IAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface ICheckout extends Document  {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  cartId: Types.ObjectId;
  items: ICheckoutItem[];
  paymentMethod: 'COD' |'Stripe'| 'Tabby' |'Tamara';
  transactionId: string;
  amount: number;
  returnReason:string;
  currency: string;
  shippingAddress: IAddress;
  billingAddress?: IAddress;
  paymentStatus?: "pending" | "completed" | "failed";
  paymentFailureReason?: string;
  orderStatus?: "processing" | "shipped" | "delivered" | "cancelled";
  returnStatus?: "not_requested" | "requested" | "approved" | "rejected";
  refundStatus?: "not_initiated" | "initiated" | "completed" | "failed";
  returnRequestedAt?: Date;
  returnProcessedAt?: Date;
  couponCode?: string;
  discountAmount?: number;
  cancellationReason?: string;
  trackingId?: string;
  paymentCompletedAt?: Date;
  orderPlacedAt: Date;
  deliveredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  userDetails:any
  hasReturnRequest?:boolean
  
}
