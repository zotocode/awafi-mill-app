import { Model, isValidObjectId } from "mongoose";
import { IReview } from "../../domain/entities/reviewSchema";
import IReviewRepo from "../../interface/reviewInterface/IreviewRepo";
import { CreateReviewDTO } from "../../domain/dtos/ReviewDTO";
import { BaseRepository } from "./baseRepository";

// Review repository extending the base repository
export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepo {

  constructor(model: Model<IReview>) {
    super(model);
  }

  private validateObjectId(id: string, type: string): void {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ${type} ID`);
    }
  }

  async createReview(data: CreateReviewDTO): Promise<IReview> {
    try {
      this.validateObjectId(data.userId, 'User');
      this.validateObjectId(data.productId, 'Product');
      this.validateObjectId(data.orderId, 'Order');

      // Check if a review already exists for the user, product, and order
      const existingReview = await this.model.findOne({
        user: data.userId,
        product: data.productId,
        order: data.orderId
      }).exec();

      const reviewEntity = {
        user: data.userId,
        product: data.productId,
        order: data.orderId,
        rating: data.rating,
        comment: data.comment
      };

      if (existingReview) {
        const updatedReview = await this.model.findByIdAndUpdate(
          existingReview._id,
          reviewEntity,
          { new: true }
        ).exec();
        if (!updatedReview) {
          throw new Error('Failed to update review');
        }
        return updatedReview;
      } else {
        return await super.create(reviewEntity);
      }
    } catch (error) {
      throw new Error(`Error creating or updating review: ${error.message}`);
    }
  }

  async findReviewsByProduct(productId: string): Promise<IReview[] | null> {
    try {
      this.validateObjectId(productId, 'Product');
      return await super.find({ product: productId });
    } catch (error) {
      throw new Error(`Error finding reviews for product: ${error.message}`);
    }
  }
}
