// src/interface/wishlistInterface/IwishlistInteractor.ts
import { WishlistDTO, AddToWishlistDTO, RemoveFromWishlistDTO } from "../../domain/dtos/WishlistDTO";

// Wishlist interactor interface
export default interface IWishlistInteractor {
  createWishlist(data: WishlistDTO): Promise<any>;
  getWishlistByUserId(userId: string): Promise<WishlistDTO | null>;
  addItemToWishlist(data: AddToWishlistDTO): Promise<any>;
  removeItemFromWishlist(data: RemoveFromWishlistDTO): Promise<any>;
  deleteWishlist(userId: string): Promise<boolean>;
}
