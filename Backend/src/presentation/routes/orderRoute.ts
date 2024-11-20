// src/routes/orderRoute.ts
import express from "express";
import { OrderRepository } from "../../infrastructure/repositories/orderRepo";
import { OrderController } from "../controllers/orderController";
import { OrderInteractor } from "../../application/interactor/OrderInteractor";
import { verifyAdminToken } from "../middleware/adminAuthMiddleware";
import { verifyToken } from "../middleware/userAuthMiddleware";
import { CheckoutModel } from "../../infrastructure/model/checkoutModel";


verifyAdminToken
// Set up dependencies
const orderRepo = new OrderRepository(CheckoutModel);
const orderInteractor = new OrderInteractor(orderRepo);
const orderController = new OrderController(orderInteractor);

const orderRoutes = express.Router();

// Admin routes
orderRoutes.get(
  "/order/admin", 
verifyAdminToken,
  orderController.getOrders.bind(orderController)
);
orderRoutes.get(
  "/order/admin/:id", 
verifyAdminToken,
  orderController.getOrderById.bind(orderController)
);
orderRoutes.patch(
  "/order/admin/:id/status", 
verifyAdminToken,
  orderController.updateOrderStatus.bind(orderController)
);
orderRoutes.patch(
  "/order/admin/:id", 
verifyAdminToken,
  orderController.cancelOrder.bind(orderController)
);


// User routes
orderRoutes.post(
  "/order", 
verifyToken,
  orderController.createOrder.bind(orderController)
);
orderRoutes.get(
  "/order/user", 
verifyToken,
  orderController.getUserOrders.bind(orderController)
);
orderRoutes.get(
  "/order/user/:id", 
verifyToken,
  orderController.getUserOrderById.bind(orderController)
);
orderRoutes.patch(
  "/order/user/:id/cancel", 
verifyToken,
  orderController.cancelUserOrder.bind(orderController)
);

export default orderRoutes;