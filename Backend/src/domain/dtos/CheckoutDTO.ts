// domain/dtos/CheckoutDTO.ts
export interface CheckoutDTO {
    userId: string;
    // cartId: string;
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
  }
  