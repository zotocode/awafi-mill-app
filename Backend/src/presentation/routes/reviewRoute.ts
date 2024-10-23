import express from "express";
import { ReviewRepository } from "../../infrastructure/repositories/reviewRepo"; 
import { ReviewController } from "../controllers/reviewController"; 
import { ReviewInteractor } from "../../application/interactor/reviewInteractor"; 
import { ReviewModel } from "../../infrastructure/model/reviewModel"; 

// Set up dependencies
const reviewRepo = new ReviewRepository(ReviewModel);
const reviewInteractor = new ReviewInteractor(reviewRepo);
const reviewController = new ReviewController(reviewInteractor);

const reviewRoutes = express.Router();

// Define routes
reviewRoutes.post("/", reviewController.createReview.bind(reviewController));
reviewRoutes.get("/:productId", reviewController.getReviewsByProductId.bind(reviewController));

export default reviewRoutes;
