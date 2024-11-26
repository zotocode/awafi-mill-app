import IAdminReviewRepo from "../../interface/reviewInterface/IadminReviewRepo";
import IAdminReviewInteractor from "../../interface/reviewInterface/IadminReviewInteractor";
import { AdminReviewDTO } from "../../domain/dtos/ReviewDTO";
import { IAggregatedReview } from "../../infrastructure/repositories/adminReviewRepo";

export class AdminReviewInteractor implements IAdminReviewInteractor {
  private reviewRepo: IAdminReviewRepo;

  constructor(reviewRepo: IAdminReviewRepo) {
    this.reviewRepo = reviewRepo;
  }

  async getAllReviews(params: any): Promise<{ reviews: AdminReviewDTO[], totalPages: number }> {
    const { reviews, totalPages } = await this.reviewRepo.findAllReviews(params);
    const mappedReviews = reviews.map(this.mapToDTO);
    return { reviews: mappedReviews, totalPages };
  }

  async updateReviewStatus(reviewId: string, status: string): Promise<AdminReviewDTO> {
    if (status !== 'approved' && status !== 'declined') {
      throw new Error("Invalid status. Status must be 'approved' or 'declined'.");
    }
    const updatedReview = await this.reviewRepo.updateReviewStatus(reviewId, status);
    return this.mapToDTO(updatedReview);
  }

  private mapToDTO(review: IAggregatedReview): AdminReviewDTO {
    return {
        id: review._id.toString(),
        userName: review.userName,
        userEmail: review.userEmail,
        reviewContent: review.reviewContent || "",
        rating: review.rating,
        productImage: review.productImage,
        productName: review.productName,
        createdAt: review.createdAt.toISOString(),
        status: review.status,
    };
  }
}
