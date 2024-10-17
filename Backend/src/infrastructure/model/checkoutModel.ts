import mongoose, { Model } from "mongoose";
import { ICheckout } from "../../domain/entities/checkoutSchema";

// Checkout schema
const checkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true }
  }],
  paymentMethod: { type: String, enum: ['COD', 'Razorpay', 'Stripe'], required: true },
  transactionId: { type: String, required: true }, 
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  
  shippingAddress: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  billingAddress: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },

  // Payment-related fields
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  paymentFailureReason: { type: String }, 

  // Order status
  orderStatus: { 
    type: String, 
    enum: ['processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'processing' 
  },

  // Return and refund management
  returnStatus: { 
    type: String, 
    enum: ['not_requested', 'requested', 'approved', 'rejected'], 
    default: 'not_requested' 
  },
  refundStatus: { 
    type: String, 
    enum: ['not_initiated', 'initiated', 'completed', 'failed'], 
    default: 'not_initiated' 
  },

  // Coupons
  couponCode: { type: String },
  discountAmount: { type: Number, default: 0 }, 

  // Tracking timestamps
  paymentCompletedAt: { type: Date },
  deliveredAt: { type: Date }
}, {
  timestamps: true
});

export const CheckoutModel: Model<ICheckout> = mongoose.model<ICheckout>("Checkout", checkoutSchema);
