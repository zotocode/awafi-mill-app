// src/interface/reviewInterface/IreviewInteractor.ts
import { ReviewDTO, CreateReviewDTO } from "../../domain/dtos/ReviewDTO";

// Review interactor interface
export default interface IReviewInteractor {
  createReview(data: CreateReviewDTO): Promise<ReviewDTO>;
  getReviewByProductId(productId: string): Promise<ReviewDTO[] | null>;
}
