import express from "express";
import { CheckoutRepository } from "../../infrastructure/repositories/checkoutRepo"; 
import { CheckoutController } from "../controllers/checkoutController"; 
import { CheckoutInteractor } from "../../application/interactor/checkoutInteractor"; 
import { CheckoutModel } from "../../infrastructure/model/checkoutModel"; 
import { CartRepository } from "../../infrastructure/repositories/cartRepo"; 
import { CartModel } from "../../infrastructure/model/cartModel"; 
import { ProductRepository } from "../../infrastructure/repositories/productRepository"; 
import paymentGateway from "../../infrastructure/paymentGateways"; 
import { ProductModel } from "../../infrastructure/model/producModel";


const checkoutRepo = new CheckoutRepository(CheckoutModel);
const cartRepo = new CartRepository(CartModel);
const productRepo = new ProductRepository(ProductModel); 
const checkoutInteractor = new CheckoutInteractor(cartRepo, checkoutRepo, productRepo, paymentGateway); 
const checkoutController = new CheckoutController(checkoutInteractor);

const checkoutRoutes = express.Router();


checkoutRoutes.post("/", checkoutController.checkout.bind(checkoutController));

export default checkoutRoutes;
