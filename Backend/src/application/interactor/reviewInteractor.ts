import IReviewRepo from "../../interface/reviewInterface/IreviewRepo"; 
import IReviewInteractor from "../../interface/reviewInterface/IreviewInteractor"; 
import { ReviewDTO, CreateReviewDTO } from "../../domain/dtos/ReviewDTO";
import { IReview } from "../../domain/entities/reviewSchema";

export class ReviewInteractor implements IReviewInteractor {
  private reviewRepo: IReviewRepo;

  constructor(reviewRepo: IReviewRepo) {
    this.reviewRepo = reviewRepo;
  }

  async createReview(data: CreateReviewDTO): Promise<ReviewDTO> {
    const review = await this.reviewRepo.createReview(data);
    return this.mapToDTO(review);
  }

  async getReviewByProductId(productId: string): Promise<ReviewDTO[] | null> {
    const reviews = await this.reviewRepo.findReviewsByProduct(productId);
    return reviews ? reviews.map(this.mapToDTO) : null;
  }

  private mapToDTO(iReview: IReview): ReviewDTO {
    return {
      userId: iReview.user.toString(),
      productId: iReview.product.toString(),
      rating: iReview.rating,
      comment: iReview.comment,
    }; 
  } 
}
