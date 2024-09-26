import express from "express";
import { CartInteractor } from "../application/interactor/cartInteractor";
import { CartController } from "../presentation/controllers/cartController";
import { CartRepo } from "../infrastruture/repositories/cartRepo";






const cartRoute = express.Router();

//repo
const cartRepo = new CartRepo()

//cart interactor
const cartInteractor = new CartInteractor(cartRepo)

//cart controllers

const cartController = new CartController(cartInteractor)


cartRoute.get('/cart-products',cartController.userCart.bind(cartController))


export default cartRoute;