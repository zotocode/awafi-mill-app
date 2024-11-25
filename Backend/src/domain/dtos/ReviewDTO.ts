// src/domain/dtos/ReviewDTO.ts

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


export interface AdminReviewDTO {
  id: string;
  userName: string;
  userEmail: string;
  reviewContent: string;
  rating: number;
  productImage: string;
  productName: string;
  createdAt: string;
  status: "pending" | "approved" | "declined";
}