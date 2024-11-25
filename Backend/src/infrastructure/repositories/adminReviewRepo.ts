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

  /**
   * Fetch all reviews with aggregation
   */
  async findAllReviews(params: any): Promise<{ reviews: IAggregatedReview[]; totalPages: number }> {
    const query: any = {};

    // Add status filter if provided
    if (params.status && params.status !== "all") {
      query.status = params.status;
    }

    // Handle search term
    if (params.search) {
      const searchTerm = params.search.trim();
      const regex = new RegExp(searchTerm, 'i'); // Create case-insensitive regex for the search term

      // Add conditions to match product name, user name, and user email
      query.$or = [
        { "userDetails.name": { $regex: regex } },
        { "userDetails.email": { $regex: regex } },
        { "productDetails.name": { $regex: regex } }
      ];
    }

    const limit = params.limit ? parseInt(params.limit, 10) : 10;
    const skip = params.page ? (parseInt(params.page, 10) - 1) * limit : 0;

    const totalCount = await this.model.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    let sortOrder: Record<string, 1 | -1> = { createdAt: -1 };
    if (params.sortOrder === "old") {
      sortOrder = { createdAt: 1 };
    }

    // console.log("query: ", query);
    const reviews = await this.model.aggregate([
      // Apply query with optional search conditions
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
      { $match: query },
      {
        $addFields: {
          images: { $arrayElemAt: ["$productDetails.images", 0] }, // Add the first image
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
          productImage: { $arrayElemAt: ["$images", 0] }, // Extract the first image URL
          status: 1,
          createdAt: 1,
        },
      },
      { $sort: sortOrder }, // Sort based on createdAt and sortOrder
    ]);

    // console.log("reviews: ", reviews);
    return { reviews: reviews as IAggregatedReview[], totalPages };
  }



  /**
   * Update the status of a review and fetch updated review
   */
  async updateReviewStatus(
    reviewId: string,
    status: "pending" | "approved" | "declined"
  ): Promise<IAggregatedReview> {
    // Update the status of the review
    const a = await this.model.updateOne({ _id: reviewId }, { $set: { status } });
    console.log("a : ", a);

    // Fetch the updated review using aggregation
    const updatedReview = await this.model.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(reviewId) } },
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
        $addFields: {
          images: { $arrayElemAt: ["$productDetails.images", 0] }  // Define the field you want to add with an expression
        }
      },
      {
        $project: {
          _id: 1,
          userName: { $arrayElemAt: ["$userDetails.name", 0] },
          userEmail: { $arrayElemAt: ["$userDetails.email", 0] },
          reviewContent: "$comment",
          rating: 1,
          productName: { $arrayElemAt: ["$productDetails.name", 0] },
          productImage: { $arrayElemAt: ["$images", 0] }, // Assuming images is an array
          status: 1,
          createdAt: 1,
        },
      },
    ]);

    if (!updatedReview || updatedReview.length === 0) {
      throw new Error("Review not found");
    }

    return updatedReview[0] as IAggregatedReview;
  }
}

