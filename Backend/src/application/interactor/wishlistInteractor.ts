// src/application/interactor/wishlistInteractor.ts
import { WishlistRepository } from "../../infrastrucutre/repositories/wishlistRepo"; 
import IWishlistInteractor from "../../interface/wishlistInterface/IwishlistInteractor";
import { WishlistDTO, AddToWishlistDTO, RemoveFromWishlistDTO } from "../../domain/dtos/WishlistDTO";
import { IWishlist } from "../../domain/entities/wishlistSchema";

export class WishlistInteractor implements IWishlistInteractor {
  private wishlistRepo: WishlistRepository;

  constructor(wishlistRepo: WishlistRepository) {
    this.wishlistRepo = wishlistRepo;
  }

  async createWishlist(data: WishlistDTO): Promise<WishlistDTO> {
    const wishlist = await this.wishlistRepo.createWishlist(data);
    return this.mapToDTO(wishlist);
  }

  async getWishlistByUserId(userId: string): Promise<WishlistDTO | null> {
    const wishlist = await this.wishlistRepo.findWishlistByUser(userId);
    return wishlist ? this.mapToDTO(wishlist) : null;
  }

  async addItemToWishlist(data: AddToWishlistDTO): Promise<WishlistDTO | null> {
    const updatedWishlist = await this.wishlistRepo.addItemToWishlist(data.userId, data.productId);
    return updatedWishlist ? this.mapToDTO(updatedWishlist) : null;
  }

  async removeItemFromWishlist(data: RemoveFromWishlistDTO): Promise<WishlistDTO | null> {
    const updatedWishlist = await this.wishlistRepo.removeItemFromWishlist(data.userId, data.productId);
    return updatedWishlist ? this.mapToDTO(updatedWishlist) : null;
  }

  async deleteWishlist(userId: string): Promise<boolean> {
    const deletedWishlist = await this.wishlistRepo.deleteWishlist(userId);
    return !!deletedWishlist;
  }

  private mapToDTO(iWishlist: IWishlist): WishlistDTO {
    return {
      userId: iWishlist.user.toString(),
      productIds: iWishlist.items.map(item => item.toString())
    };
  }
}
