import { NextFunction, Request, Response } from "express";
import IAdminReviewInteractor from "../../interface/reviewInterface/IadminReviewInteractor"; 

export class AdminReviewController {
  private reviewInteractor: IAdminReviewInteractor;

  constructor(reviewInteractor: IAdminReviewInteractor) {
    this.reviewInteractor = reviewInteractor;
  }

  async getAllReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.query;
      console.log("params: ", params);
      const reviews = await this.reviewInteractor.getAllReviews(params);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }

  async updateReviewStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { reviewId } = req.params;
      const { status } = req.body; // 'approve' or 'decline'
      const updatedReview = await this.reviewInteractor.updateReviewStatus(reviewId, status);
      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  }
}
