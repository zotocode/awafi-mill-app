import { Model } from "mongoose";
import { IReview } from "../../domain/entities/reviewSchema";
import IAdminReviewRepo from "../../interface/reviewInterface/IadminReviewRepo";
import mongoose from "mongoose";

export interface IAggregatedReview extends IReview {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    userName: string;
    userEmail: string;
    reviewContent: string;
    productName: string;
    productImage: string;
}

export class AdminReviewRepository implements IAdminReviewRepo {
    private model: Model<IReview>;

    constructor(model: Model<IReview>) {
        this.model = model;
    }

    async findAllReviews(params: any): Promise<IAggregatedReview[]> {
        const query: any = {};
        if (params.status && params.status !== "all") {
            query.status = params.status;
        }
        const limit = params.limit ? parseInt(params.limit, 10) : 10;
        const skip = params.page ? (parseInt(params.page, 10) - 1) * limit : 0;
        const reviews = await this.model.aggregate([
            { $match: query },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "productDetails",
              },
            },
            {
              $project: {
                _id: 1,
                userName: { $arrayElemAt: ["$userDetails.name", 0] },
                userEmail: { $arrayElemAt: ["$userDetails.email", 0] },
                reviewContent: "$comment",
                rating: 1,
                productName: { $arrayElemAt: ["$productDetails.name", 0] },
                productImage: { $arrayElemAt: ["$productDetails.image", 0] },
                status: 1,
                createdAt: 1,
              },
            },
        ]);
      
        return reviews as IAggregatedReview[];
    }

    async updateReviewStatus(reviewId: string, status: string): Promise<IAggregatedReview> {
      const query: any = { _id: reviewId };
      const updatedReview = await this.model.aggregate([
          { $match: query },
          {
              $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "userDetails",
              },
          },
          {
              $lookup: {
                  from: "products",
                  localField: "product",
                  foreignField: "_id",
                  as: "productDetails",
              },
          },
          {
              $project: {
                  _id: 1,
                  createdAt: 1,
                  userName: { $arrayElemAt: ["$userDetails.name", 0] },
                  userEmail: { $arrayElemAt: ["$userDetails.email", 0] },
                  reviewContent: "$comment",
                  rating: 1,
                  productName: { $arrayElemAt: ["$productDetails.name", 0] },
                  productImage: { $arrayElemAt: ["$productDetails.image", 0] },
                  status: 1,
              },
          },
          { $set: { status: status } },
      ]).exec();
      if (!updatedReview || updatedReview.length === 0) {
          throw new Error("Review not found");
      }
      return updatedReview[0] as IAggregatedReview;
  }
}
