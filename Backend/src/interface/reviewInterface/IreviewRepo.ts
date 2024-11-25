// src/interface/reviewInterface/IreviewRepo.ts
import { IReview } from "../../domain/entities/reviewSchema";
import { CreateReviewDTO } from "../../domain/dtos/ReviewDTO";

// Review repository interface
export default interface IReviewRepo {
  createReview(data: CreateReviewDTO): Promise<IReview>;
  findReviewsByProduct(productId: string): Promise<IReview[] | null>;
}
