import { Model } from "mongoose";
import { IReview } from "../../domain/entities/reviewSchema";
import IReviewRepo from "../../interface/reviewInterface/IreviewRepo"; 
import { CreateReviewDTO } from "../../domain/dtos/ReviewDTO";
import { BaseRepository } from "./baseRepository";  

// Review repository extending the base repository
export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepo {

  constructor(model: Model<IReview>) {
    super(model); 
  }

  async createReview(data: CreateReviewDTO): Promise<IReview> {
    const reviewEntity = { user: data.userId, product: data.productId, rating: data.rating, comment: data.comment };
    return await this.create(reviewEntity);
  }

  async findReviewsByProduct(productId: string): Promise<IReview[] | null> {
    return await this.find({ product: productId }); 
  }
}
