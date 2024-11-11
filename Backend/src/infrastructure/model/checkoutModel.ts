import mongoose, { Model } from "mongoose";
import { ICheckout } from "../../domain/entities/checkoutSchema";

// Checkout schema
const checkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: true },
    quantity: { type: Number, required: true }
  }],
  paymentMethod: { type: String, enum: ['COD', 'Razorpay', 'Stripe'], required: true },
  transactionId: { type: String, required: false }, 
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },

  shippingAddress: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String ,required:true},
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  billingAddress: {
    fullName: { type: String, required: false },
    addressLine1: { type: String, required: false },
    addressLine2: { type: String ,required:false},
    city: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, required: false },
    phone: { type: String, required: false }
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
  couponCode: { type: String, required:false },
  discountAmount: { type: Number, default: 0,required:false }, 
  cancellationReason: { type: String, requiered:false }, 
  trackingId:{type:String,required:false},
  // Tracking timestamps
  paymentCompletedAt: { type: Date ,required:false},
  orderPlacedAt:{type:Date,required:true},
  deliveredAt: { type: Date ,required:true}
}, {
  timestamps: true
});

export const CheckoutModel: Model<ICheckout> = mongoose.model<ICheckout>("Checkout", checkoutSchema);
