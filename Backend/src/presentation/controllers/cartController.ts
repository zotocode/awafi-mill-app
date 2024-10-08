// src/presentation/controllers/cartController.ts

import { NextFunction, Request, Response } from "express";
import ICartInteractor from "../../interface/cartInterface/IcartInteractor"; // Import Cart interactor interface
import { CartDTO, AddToCartDTO, UpdateCartQuantityDTO, RemoveFromCartDTO } from "../../domain/dtos/CartDTO";

export class CartController {
  private cartInteractor: ICartInteractor; // Use the Cart interactor interface

  constructor(cartInteractor: ICartInteractor) {
    this.cartInteractor = cartInteractor;
  }

  // Create a new cart (HTTP POST)
  async createCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cartData: CartDTO = req.body;
      await this.cartInteractor.createCart(cartData);
      res.status(201).json({ message: "Cart created successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Get a cart by user ID (HTTP GET)
  async getCartByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.userId;
      const cart = await this.cartInteractor.getCartByUserId(userId);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Add item to cart (HTTP POST)
  async addItemToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const itemData: AddToCartDTO = req.body;
      const updatedCart = await this.cartInteractor.addItemToCart(itemData);
      res.status(200).json(updatedCart);
    } catch (error) {
      next(error);
    }
  }

  // Update item quantity in cart (HTTP PUT)
  async updateCartItemQuantity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const itemData: UpdateCartQuantityDTO = req.body;
      const updatedCart = await this.cartInteractor.updateCartItemQuantity(itemData);
      res.status(200).json(updatedCart);
    } catch (error) {
      next(error);
    }
  }

  // Remove item from cart (HTTP POST)
  async removeItemFromCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const itemData: RemoveFromCartDTO = req.body;
      const updatedCart = await this.cartInteractor.removeItemFromCart(itemData);
      res.status(200).json(updatedCart);
    } catch (error) {
      next(error);
    }
  }

  // Clear cart (HTTP DELETE)
  async clearCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.userId;
      const cleared = await this.cartInteractor.deleteCart(userId);
      if (cleared) {
        res.status(200).json({ message: "Cart cleared successfully" });
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}
