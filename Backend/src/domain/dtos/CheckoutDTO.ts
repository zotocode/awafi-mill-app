// domain/dtos/CheckoutDTO.ts
export interface CheckoutDTO {
    userId: string;
    // cartId: string;
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
  }
  
  export interface OrderSummary {
    totalCount: number;
    totalAmount: number;
    orderStatus: 'delivered' | 'shipped' | 'returned' | 'processing';
  }


  export interface RevenueSummary {
    totalRevenue: number;
    count: number;
    day: number;
  }