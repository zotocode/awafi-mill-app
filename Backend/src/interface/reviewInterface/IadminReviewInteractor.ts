import { AdminReviewDTO } from "../../domain/dtos/ReviewDTO";

export default interface IAdminReviewInteractor {
  getAllReviews(params: any): Promise<AdminReviewDTO[]>;
  updateReviewStatus(reviewId: string, status: string): Promise<AdminReviewDTO>;
}
