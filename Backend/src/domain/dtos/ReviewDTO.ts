export interface ReviewDTO {
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
  }
  
  export interface CreateReviewDTO {
    userId: string;
    productId: string;
    orderId: string;
    rating: number;
    comment?: string;
  }
  