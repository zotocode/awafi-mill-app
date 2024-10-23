// src/infrastructure/repositories/cartRepo.ts
import { CartDTO } from "../../domain/dtos/CartDTO";
import { Model } from "mongoose";
import { IUserCart } from "../../domain/entities/userCartSchema";
import { BaseRepository } from "./baseRepository";
import ICartRepo from "../../interface/cartInterface/IcartRepo"

// Cart repository extending the base repository
export class CartRepository extends BaseRepository<IUserCart> implements ICartRepo {
  constructor(model: Model<IUserCart>) {
    super(model);
  }

  async createCart(data: CartDTO): Promise<IUserCart> {
    const cartEntity = { user: data.userId, items: data.items };
    return await super.create(cartEntity);
  }

  async findCartByUser(userId: string): Promise<IUserCart | null> {
    return await this.model.findOne({ user: userId }).exec();
  }
 
  async addItemToCart(userId: string, productId: string, quantity: number): Promise<IUserCart | null> {
    return await this.model.findOneAndUpdate(
      { user: userId },
      { $addToSet: { items: { product: productId, quantity } } }, // Adds product with quantity, avoids duplicates
      { new: true }
    ).exec();
  }

  async updateItemQuantity(userId: string, productId: string, quantity: number): Promise<IUserCart | null> {
    return await this.model.findOneAndUpdate(
      { user: userId, "items.product": productId },
      { $set: { "items.$.quantity": quantity } }, // Update the quantity of the product
      { new: true }
    ).exec();
  }

  async removeItemFromCart(userId: string, productId: string): Promise<IUserCart | null> {
    return await this.model.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).exec();
  }

  async clearCart(userId: string): Promise<IUserCart | null> {
    return await this.model.findOneAndDelete({ user: userId }).exec();
  }
}
