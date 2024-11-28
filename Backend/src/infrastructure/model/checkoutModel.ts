import mongoose, { Model } from "mongoose";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { required } from "joi";

// Checkout schema
const checkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: false },
  orderId: { type: String,  required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
    variantId: { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: false },
    quantity: { type: Number, required: false },
    returnStatus: { 
      type: String, 
      enum: ['not_requested', 'requested', 'approved', 'rejected'], 
      default: 'not_requested' 
    },
    returnReason: { type: String }, // Reason for return
    refundAmount: { type: Number, default: 0 }, // Amount refunded for this item
    name: { type: String, required: true },
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: String, required: true },
  }],
  paymentMethod: { type: String, enum: ['COD','Stripe', 'Tabby' ,'Tamara'], required: true },
  transactionId: { type: String, required: true }, 
  amount: { type: Number, required: true },
  currency: { type: String, default: 'AED' },
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
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  paymentFailureReason: { type: String }, 
  orderStatus: { 
    type: String, 
    enum: ['processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'processing' 
  },
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
  returnRequestedAt: { type: Date }, 
  returnProcessedAt: { type: Date }, 
  returnReason:{type:String,required:false},
  couponCode: { type: String, required:false },
  discountAmount: { type: Number, default: 0,required:false }, 
  cancellationReason: { type: String, requiered:false }, 
  trackingId: { type: String, required:false },
  paymentCompletedAt: { type: Date, required:false },
  orderPlacedAt: { type: Date, required:true },
  deliveredAt: { type: Date, required:true }
}, {
  timestamps: true
});


export const CheckoutModel: Model<ICheckout> = mongoose.model<ICheckout>("Checkout", checkoutSchema);
