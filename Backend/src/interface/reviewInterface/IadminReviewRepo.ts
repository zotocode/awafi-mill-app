import { IAggregatedReview } from "../../infrastructure/repositories/adminReviewRepo";

export default interface IAdminReviewRepo {
  findAllReviews(params: any): Promise<IAggregatedReview[]>;
  updateReviewStatus(reviewId: string, status: string): Promise<IAggregatedReview>;
}
