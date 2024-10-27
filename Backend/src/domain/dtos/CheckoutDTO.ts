<<<<<<< HEAD
export interface CheckoutDTO {
    userId: string;
    cartId: string;
=======
// domain/dtos/CheckoutDTO.ts
export interface CheckoutDTO {
    userId: string;
    // cartId: string;
>>>>>>> upstream/develop
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
  }
  