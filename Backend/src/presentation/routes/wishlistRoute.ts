// src/routes/wishlistRoute.ts
import express from "express";
import { WishlistRepository } from "../../infrastructure/repositories/wishlistRepo"; 
import { WishlistController } from "../controllers/wishlistController"; 
import { WishlistInteractor } from "../../application/interactor/wishlistInteractor"; 
import { WishlistModel } from "../../infrastructure/model/wishlistModel"; 

// Set up dependencies
const wishlistRepo = new WishlistRepository(WishlistModel);
const wishlistInteractor = new WishlistInteractor(wishlistRepo);
const wishlistController = new WishlistController(wishlistInteractor);


const wishlistRoutes = express.Router();
// Define routes
wishlistRoutes.post("/", wishlistController.createWishlist.bind(wishlistController));
wishlistRoutes.get("/", wishlistController.getWishlistByUserId.bind(wishlistController));
wishlistRoutes.post("/add", wishlistController.addItemToWishlist.bind(wishlistController));
wishlistRoutes.post("/remove", wishlistController.removeItemFromWishlist.bind(wishlistController));
wishlistRoutes.delete("/", wishlistController.deleteWishlist.bind(wishlistController));

export default wishlistRoutes;
