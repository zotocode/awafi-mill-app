import { WishlistDTO } from "../../domain/dtos/WishlistDTO";
import { Model, isValidObjectId } from "mongoose";
import { IWishlist } from "../../domain/entities/wishlistSchema";
import { BaseRepository } from "./baseRepository";
import IWishlistRepo from "../../interface/wishlistInterface/IwishlistRepo";

// Wishlist repository extending the base repository and implementing IWishlistRepo
export class WishlistRepository extends BaseRepository<IWishlist> implements IWishlistRepo {
  constructor(model: Model<IWishlist>) {
    super(model);
  }

  private async getOrCreateWishlist(userId: string): Promise<IWishlist> {
    let wishlist = await this.model.findOne({ user: userId }).exec();
    if (!wishlist) {
      wishlist = await this.createWishlist({ userId, productIds: [] });
    }
    return wishlist;
  }

  private validateObjectId(id: string, type: string): void {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ${type} ID`);
    }
  }

  async createWishlist(data: WishlistDTO): Promise<IWishlist> {
    try {
      const wishlistEntity = { user: data.userId, items: data.productIds };
      return await super.create(wishlistEntity);
    } catch (error) {
      throw new Error(`Error creating wishlist: ${error.message}`);
    }
  }

  async findWishlistByUser(userId: string): Promise<IWishlist> {
    try {
      this.validateObjectId(userId, 'User');
      return await this.getOrCreateWishlist(userId);
    } catch (error) {
      throw new Error(`Error finding wishlist: ${error.message}`);
    }
  }

  async addItemToWishlist(userId: string, productId: string): Promise<IWishlist> {
    try {
      this.validateObjectId(userId, 'User');
      this.validateObjectId(productId, 'Product');

      await this.getOrCreateWishlist(userId);

      return await this.model.findOneAndUpdate(
        { user: userId },
        { $addToSet: { items: productId } }, // Avoids duplicates
        { new: true, upsert: true }
      ).exec();
    } catch (error) {
      throw new Error(`Error adding item to wishlist: ${error.message}`);
    }
  }

  async removeItemFromWishlist(userId: string, productId: string): Promise<IWishlist | null> {
    try {
      this.validateObjectId(userId, 'User');
      this.validateObjectId(productId, 'Product');

      return await this.model.findOneAndUpdate(
        { user: userId },
        { $pull: { items: productId } },
        { new: true }
      ).exec();
    } catch (error) {
      throw new Error(`Error removing item from wishlist: ${error.message}`);
    }
  }

  async deleteWishlist(userId: string): Promise<IWishlist | null> {
    try {
      this.validateObjectId(userId, 'User');
      return await this.model.findOneAndDelete({ user: userId }).exec();
    } catch (error) {
      throw new Error(`Error deleting wishlist: ${error.message}`);
    }
  }
}
