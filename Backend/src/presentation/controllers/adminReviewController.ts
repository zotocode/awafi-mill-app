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
      const { reviews, totalPages } = await this.reviewInteractor.getAllReviews(params);
  
      res.status(200).json({
        reviews,
        totalPages,
        currentPage: params.page || 1,
      });
    } catch (error) {
      next(error);
    }
  }
  

  async updateReviewStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { reviewId } = req.params;
      console.log("reviewId: ", reviewId);
      const { status } = req.body; // 'approve' or 'decline'
      console.log("status: ", status);
      const updatedReview = await this.reviewInteractor.updateReviewStatus(reviewId, status);
      console.log("updatedReview: ", updatedReview);
      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  }
}
