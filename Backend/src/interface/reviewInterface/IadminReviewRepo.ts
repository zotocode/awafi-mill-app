// src/interface/reviewInterface/IadminReviewRepo.ts

import { IAggregatedReview } from "../../infrastructure/repositories/adminReviewRepo";

export default interface IAdminReviewRepo {
  findAllReviews(params: any): Promise<{ reviews: IAggregatedReview[], totalPages: number }>;
  updateReviewStatus(reviewId: string, status: string): Promise<IAggregatedReview>;
}
