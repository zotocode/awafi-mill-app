// src/presentation/routes/cartRoute.ts
import express from "express";
import { CartRepository } from "../../infrastructure/repositories/cartRepo"; 
import { CartController } from "../controllers/cartController"; 
import { CartInteractor } from "../../application/interactor/cartInteractor"; 
import { CartModel } from "../../infrastructure/model/cartModel"; 

// Set up dependencies
const cartRepo = new CartRepository(CartModel);
const cartInteractor = new CartInteractor(cartRepo);
const cartController = new CartController(cartInteractor);

const cartRoutes = express.Router();

// Define routes
cartRoutes.post("/cart", cartController.createCart.bind(cartController));
cartRoutes.get("/cart/:userId", cartController.getCartByUserId.bind(cartController));
cartRoutes.post("/cart/add", cartController.addItemToCart.bind(cartController));
cartRoutes.put("/cart/update", cartController.updateCartItemQuantity.bind(cartController));
cartRoutes.post("/cart/remove", cartController.removeItemFromCart.bind(cartController));
cartRoutes.delete("/cart/:userId", cartController.clearCart.bind(cartController));

export default cartRoutes;
