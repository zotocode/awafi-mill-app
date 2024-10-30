// src/presentation/controllers/wishlistController.ts
import { NextFunction, Request, Response } from "express";
import IWishlistInteractor from "../../interface/wishlistInterface/IwishlistInteractor"; // Import Wishlist interactor interface
import { WishlistDTO, AddToWishlistDTO, RemoveFromWishlistDTO } from "../../domain/dtos/WishlistDTO";
 
export class WishlistController {
  private wishlistInteractor: IWishlistInteractor; // Use the Wishlist interactor interface

  constructor(wishlistInteractor: IWishlistInteractor) {
    this.wishlistInteractor = wishlistInteractor;
  }

  // Create a new wishlist (HTTP POST)
  async createWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const wishlistData: WishlistDTO = req.body;
      wishlistData.userId = userId;
      await this.wishlistInteractor.createWishlist(wishlistData);
      res.status(201).json({ message: "Wishlist created successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Get a wishlist by user ID (HTTP GET)
  async getWishlistByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const wishlist = await this.wishlistInteractor.getWishlistByUserId(userId);
      if (wishlist) {
        res.status(200).json(wishlist);
      } else {
        res.status(404).json({ message: "Wishlist not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Add item to wishlist (HTTP POST)
  async addItemToWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    try {
      
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const itemData: AddToWishlistDTO = req.body;
      
      itemData.userId = userId;
      const updatedWishlist = await this.wishlistInteractor.addItemToWishlist(itemData);
      res.status(200).json(updatedWishlist);
    } catch (error) {
      next(error);
    }
  }

  // Remove item from wishlist (HTTP POST)
  async removeItemFromWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const itemData: RemoveFromWishlistDTO = req.body;
      itemData.userId = userId;
      const updatedWishlist = await this.wishlistInteractor.removeItemFromWishlist(itemData);
      res.status(200).json(updatedWishlist);
    } catch (error) {
      next(error);
    }
  }

  // Delete a wishlist (HTTP DELETE)
  async deleteWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const deleted = await this.wishlistInteractor.deleteWishlist(userId);
      if (deleted) {
        res.status(200).json({ message: "Wishlist deleted successfully" });
      } else {
        res.status(404).json({ message: "Wishlist not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}
