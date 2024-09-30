import { WishlistDTO } from "../../domain/dtos/WishlistDTO";
import { Model } from "mongoose";
import { IWishlist } from "../../domain/entities/wishlistSchema";
import { BaseRepository } from "./baseRepository";

// Wishlist repository extending the base repository
export class WishlistRepository extends BaseRepository<IWishlist> {
  constructor(model: Model<IWishlist>) {
    super(model);
  }

  async createWishlist(data: WishlistDTO): Promise<IWishlist> {
    const wishlistEntity = { user: data.userId, items: data.productIds };
    return await super.create(wishlistEntity);
  }

  async findWishlistByUser(userId: string): Promise<IWishlist | null> {
    return await this.model.findOne({ user: userId }).exec();
  }

  async addItemToWishlist(userId: string, productId: string): Promise<IWishlist | null> {
    return await this.model.findOneAndUpdate(
      { user: userId },
      { $addToSet: { items: productId } }, // Avoids duplicates
      { new: true }
    ).exec();
  }

  async removeItemFromWishlist(userId: string, productId: string): Promise<IWishlist | null> {
    return await this.model.findOneAndUpdate(
      { user: userId },
      { $pull: { items: productId } },
      { new: true }
    ).exec();
  }

  async deleteWishlist(userId: string): Promise<IWishlist | null> {
    return await this.model.findOneAndDelete({ user: userId }).exec();
  }
}
