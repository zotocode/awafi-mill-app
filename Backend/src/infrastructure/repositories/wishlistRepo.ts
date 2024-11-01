import { WishlistDTO } from "../../domain/dtos/WishlistDTO";
import { Model, isValidObjectId, Types } from "mongoose";
import { IWishlist } from "../../domain/entities/wishlistSchema";
import { BaseRepository } from "./baseRepository";
import IWishlistRepo from "../../interface/wishlistInterface/IwishlistRepo";

// Wishlist repository extending the base repository and implementing IWishlistRepo
export class WishlistRepository extends BaseRepository<IWishlist> implements IWishlistRepo {
  constructor(model: Model<IWishlist>) {
    super(model);
  }

  // Validate and convert a string ID to ObjectId
  private validateAndConvertId(id: string, type: string): Types.ObjectId {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ${type} ID`);
    }
    return new Types.ObjectId(id);
  }

  private async getOrCreateWishlist(userId: Types.ObjectId): Promise<IWishlist> {
    let wishlist = await this.model.findOne({ user: userId }).exec();
    if (!wishlist) {
      wishlist = await this.createWishlist({ userId: userId.toString(), productIds: [] });
    }
    return wishlist;
  }

  async createWishlist(data: WishlistDTO): Promise<IWishlist> {
    try {
      const userObjectId = this.validateAndConvertId(data.userId, 'User');
      const productObjectIds = data.productIds.map(id => this.validateAndConvertId(id, 'Product'));
      const wishlistEntity = { user: userObjectId, items: productObjectIds };
      return await super.create(wishlistEntity);
    } catch (error) {
      throw new Error(`Error creating wishlist: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findWishlistByUser(userId: string): Promise<IWishlist> {
    try {
      const userObjectId = this.validateAndConvertId(userId, 'User');
      return await this.getOrCreateWishlist(userObjectId);
    } catch (error) {
      throw new Error(`Error finding wishlist: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async addItemToWishlist(userId: string, productId: string): Promise<IWishlist> {
    try {
      const userObjectId = this.validateAndConvertId(userId, 'User');
      const productObjectId = this.validateAndConvertId(productId, 'Product');

      await this.getOrCreateWishlist(userObjectId);

      return await this.model.findOneAndUpdate(
        { user: userObjectId },
        { $addToSet: { items: productObjectId } }, // Avoids duplicates
        { new: true, upsert: true }
      ).exec();
    } catch (error) {
      throw new Error(`Error adding item to wishlist: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async removeItemFromWishlist(userId: string, productId: string): Promise<IWishlist | null> {
    try {
      const userObjectId = this.validateAndConvertId(userId, 'User');
      const productObjectId = this.validateAndConvertId(productId, 'Product');

      return await this.model.findOneAndUpdate(
        { user: userObjectId },
        { $pull: { items: productObjectId } },
        { new: true }
      ).exec();
    } catch (error) {
      throw new Error(`Error removing item from wishlist: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async deleteWishlist(userId: string): Promise<IWishlist | null> {
    try {
      const userObjectId = this.validateAndConvertId(userId, 'User');
      return await this.model.findOneAndDelete({ user: userObjectId }).exec();
    } catch (error) {
      throw new Error(`Error deleting wishlist: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
