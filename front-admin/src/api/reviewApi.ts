import { AxiosInstance } from "axios";
import { useApi } from "./axiosConfig";

// Define the Review type
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

// Define parameters for fetching reviews
export type FetchReviewsParams = {
    page?: number;
    limit?: number;
    sortOrder?: "recent" | "old";
    status?: "all" | "pending" | "approved";
    search?: string;
};

// Define the response structure for paginated review fetch
export type FetchReviewsResponse = {
    reviews: Review[];
    totalPages: number;
    totalCount: number; // Optional: If available for additional information
};

class ReviewApi {
    private api: AxiosInstance;

    constructor(apiInstance: AxiosInstance) {
        this.api = apiInstance;
    }

    // Fetch reviews with pagination
    async fetchReviews(params: FetchReviewsParams): Promise<FetchReviewsResponse> {
        try {
            const response = await this.api.get<FetchReviewsResponse>("/api/adminReview/", { params });
            console.log("response.data: ", response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            throw error;
        }
    }

    // Approve a review by its ID
    async statusReview(reviewId: string, status: string): Promise<Review> {
        try {
            const response = await this.api.patch<Review>(`/api/adminReview/${reviewId}/approved`,{status});
            return response.data;
        } catch (error) {
            console.error("Failed to approve review:", error);
            throw error;
        }
    }

}

// Create an instance of ReviewApi using the existing Axios configuration
const reviewApiInstance = new ReviewApi(useApi());

export default reviewApiInstance;
