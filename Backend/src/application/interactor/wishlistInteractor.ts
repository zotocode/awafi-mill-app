import IWishlistRepo from "../../interface/wishlistInterface/IwishlistRepo"; // Use IWishlistRepo interface
import IWishlistInteractor from "../../interface/wishlistInterface/IwishlistInteractor";
import { WishlistDTO, AddToWishlistDTO, RemoveFromWishlistDTO } from "../../domain/dtos/WishlistDTO";
import { IWishlist } from "../../domain/entities/wishlistSchema";

export class WishlistInteractor implements IWishlistInteractor {
  private wishlistRepo: IWishlistRepo; // Use the IWishlistRepo interface

  constructor(wishlistRepo: IWishlistRepo) {
    this.wishlistRepo = wishlistRepo;
  }

  async createWishlist(data: WishlistDTO): Promise<WishlistDTO> {
    const wishlist = await this.wishlistRepo.createWishlist(data);
    return this.mapToDTO(wishlist);
  }

  async getWishlistByUserId(userId: string): Promise<WishlistDTO | null> {
    const wishlist = await this.wishlistRepo.findWishlistByUser(userId);
    //DEBUG
    //@ts-ignore
    return wishlist
    // return wishlist ? this.mapToDTO(wishlist) : null;
  }
  async addItemToWishlist(data: AddToWishlistDTO): Promise<WishlistDTO | null> {
    const updatedWishlist = await this.wishlistRepo.addItemToWishlist(data.userId, data.productId, data.variantId);
    return updatedWishlist ? this.mapToDTO(updatedWishlist) : null;
  }

  async removeItemFromWishlist(data: RemoveFromWishlistDTO): Promise<WishlistDTO | null> {
    const updatedWishlist = await this.wishlistRepo.removeItemFromWishlist(data.userId, data.productId, data.variantId);
    return updatedWishlist ? this.mapToDTO(updatedWishlist) : null;
  }

  async deleteWishlist(userId: string): Promise<boolean> {
    const deletedWishlist = await this.wishlistRepo.deleteWishlist(userId);
    return !!deletedWishlist;
  }

  private mapToDTO(iWishlist: IWishlist): WishlistDTO {
    return {
      userId: iWishlist.user.toString(),
      items: iWishlist.items.map(item => ({
        productId: item.productId.toString(),
        variantId: item.variantId.toString() // Ensure variantId is also included
      }))
    };
  }
}
