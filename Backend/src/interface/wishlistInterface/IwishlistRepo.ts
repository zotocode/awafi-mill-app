// src/interface/wishlistInterface/IwishlistRepo.ts
import { WishlistDTO } from "../../domain/dtos/WishlistDTO";
import { IWishlist } from "../../domain/entities/wishlistSchema";

// Wishlist repository interface
export default interface IWishlistRepo {
  createWishlist(data: WishlistDTO): Promise<IWishlist>;
  findWishlistByUser(userId: string): Promise<IWishlist | null>;
  addItemToWishlist(userId: string, productId: string): Promise<IWishlist | null>;
  removeItemFromWishlist(userId: string, productId: string): Promise<IWishlist | null>;
  deleteWishlist(userId: string): Promise<IWishlist | null>;
}
