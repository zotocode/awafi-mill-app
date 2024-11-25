import { AxiosInstance } from "axios";
import { useApi } from "./axiosConfig";
export type Review = {
    id: string;
    userName: string;
    userEmail: string;
    reviewContent: string;
    rating: number;
    productImage: string;
    productName: string;
    createdAt: string;
    status: "pending" | "approved";
};

export type FetchReviewsParams = {
    page?: number;
    limit?: number;
    sortOrder?: "recent" | "old";
    status?: "all" | "pending" | "approved";
    search?: string;
};

class ReviewApi {
    private api: AxiosInstance;

    constructor(apiInstance: AxiosInstance) {
        this.api = apiInstance;
    }

    async fetchReviews(params: FetchReviewsParams) {
        try {
            const response = await this.api.get<Review[]>("/reviews", { params });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            throw error;
        }
    }

    async approveReview(reviewId: string) {
        try {
            const response = await this.api.patch<Review>(`/reviews/${reviewId}/approve`);
            return response.data;
        } catch (error) {
            console.error("Failed to approve review:", error);
            throw error;
        }
    }

    async deleteReview(reviewId: string) {
        try {
            await this.api.delete(`/reviews/${reviewId}`);
        } catch (error) {
            console.error("Failed to delete review:", error);
            throw error;
        }
    }
}

// Create an instance of ReviewApi using the existing Axios configuration
const reviewApiInstance = new ReviewApi(useApi());

export default reviewApiInstance;
