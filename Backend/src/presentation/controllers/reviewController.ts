// src/presentation/controllers/reviewController.ts
import { NextFunction, Request, Response } from "express";
import IReviewInteractor from "../../interface/reviewInterface/IreviewInteractor";
import { CreateReviewDTO } from "../../domain/dtos/ReviewDTO";

export class ReviewController {
  private reviewInteractor: IReviewInteractor;

  constructor(reviewInteractor: IReviewInteractor) {
    this.reviewInteractor = reviewInteractor;
  }

  // Create a new review (HTTP POST)
  async createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const userId = req.user?.id;
      const reviewData: CreateReviewDTO = req.body;
      reviewData.userId = userId;
      const review = await this.reviewInteractor.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  // Get reviews by product ID (HTTP GET)
  async getReviewsByProductId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId = req.params.productId;
      const reviews = await this.reviewInteractor.getReviewByProductId(productId);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }
}
