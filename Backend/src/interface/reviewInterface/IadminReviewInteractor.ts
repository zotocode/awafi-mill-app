// src/interface/reviewInterface/IadminReviewInteractor.ts

import { AdminReviewDTO } from "../../domain/dtos/ReviewDTO";

export default interface IAdminReviewInteractor {
  getAllReviews(params: any): Promise<{ reviews: AdminReviewDTO[], totalPages: number }>;
  updateReviewStatus(reviewId: string, status: string): Promise<AdminReviewDTO>;
}
