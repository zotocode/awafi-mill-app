// src/routes/wishlistRoute.ts
import express from "express";
import { WishlistRepository } from "../infrastrucutre/repositories/wishlistRepo"; 
import { WishlistController } from "../presentation/controllers/wishlistController"; 
import { WishlistInteractor } from "../application/interactor/wishlistInteractor"; 
import { WishlistModel } from "../infrastrucutre/model/wishlistModel";

// Set up dependencies
const wishlistRepo = new WishlistRepository(WishlistModel);
const wishlistInteractor = new WishlistInteractor(wishlistRepo);
const wishlistController = new WishlistController(wishlistInteractor);

const wishlistRoutes = express.Router();

// Define routes
wishlistRoutes.post("/wishlist", wishlistController.createWishlist.bind(wishlistController));
wishlistRoutes.get("/wishlist/:userId", wishlistController.getWishlistByUserId.bind(wishlistController));
wishlistRoutes.post("/wishlist/add", wishlistController.addItemToWishlist.bind(wishlistController));
wishlistRoutes.post("/wishlist/remove", wishlistController.removeItemFromWishlist.bind(wishlistController));
wishlistRoutes.delete("/wishlist/:userId", wishlistController.deleteWishlist.bind(wishlistController));

export default wishlistRoutes;
