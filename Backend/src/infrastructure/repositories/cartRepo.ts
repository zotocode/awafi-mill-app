// src/infrastructure/repositories/cartRepo.ts
import { CartDTO } from "../../domain/dtos/CartDTO";
import { Model, Types } from "mongoose";
import { IUserCart } from "../../domain/entities/userCartSchema";
import { BaseRepository } from "./baseRepository";
import ICartRepo from "../../interface/cartInterface/IcartRepo";
import { ProductModel } from "../model/producModel"; // Adjust the import based on your project structure
import mongoose from "mongoose";
// Cart repository extending the base repository
export class CartRepository extends BaseRepository<IUserCart> implements ICartRepo {
  constructor(model: Model<IUserCart>) {
    super(model);
  }

  async createCart(data: CartDTO): Promise<IUserCart> {
    try {
      const cartEntity = { user: data.userId, items: data.items };
      return await super.create(cartEntity);
    } catch (error) {
      console.error("Error creating cart:", error);
      throw new Error("Could not create cart. Please try again later.");
    }
  }

  // return await this.model
  //   .findOne({ user: userId })
  //   .exec();
  // Repository method
  // @ts-ignore
  async findCartByUser(userId: string): Promise<IUserCart | null> {
    try {
      let cart = await this.model.findOne({ user: userId })
        .populate('items.product')
        .exec();
        if (!cart) {
          return null;
        }
        const transformedCart = cart.items.map(item => {
          const product = item.product as any;  // Casting to `any` for easier access to nested fields
          const variant = product.variants.find((v: any) => v._id.toString() === item.variant.toString());
    
          return {
            productId: product._id.toString(),
            variantId: item.variant.toString(),
            name: product.name,
            quantity: item.quantity,
            weight: variant ? variant.weight : null,
            inPrice: variant ? variant.inPrice : null,
            outPrice: variant ? variant.outPrice : null,
            images: product.images[0], 
            stockQuantity: variant ? variant.stockQuantity : null,
            rating: product.rating || 0 
          };
        });
    
        // console.log("Transformed cart:", transformedCart);
        // @ts-ignore
        return transformedCart;
      } catch (error) {
        console.error("Error finding cart for user:", error);
        throw new Error("Could not find cart for the user. Please check the user ID.");
      }
    }

  async checkProductAvailability(productId: string, variantId: string, quantity: number): Promise<boolean> {
    try {
      const product = await ProductModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(productId),
            'variants._id': new Types.ObjectId(variantId),
          },
        },
        {
          $unwind: '$variants',
        },
        {
          $match: {
            'variants._id': new Types.ObjectId(variantId),
          },
        },
        {
          $project: {
            stockQuantity: '$variants.stockQuantity',
          },
        },
      ]).exec();

      if (product.length > 0 && product[0].stockQuantity >= quantity) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking product availability:", error);
      throw new Error("Could not check product availability. Please try again later.");
    }
  }

  async addItemToCart(userId: string, productId: string, variantId: string, quantity: number): Promise<IUserCart | null> {
    try {
      // Validate input
      if (!userId || !productId || !variantId || quantity === undefined) {
        throw new Error("Invalid input parameters: userId, productId, variantId, and quantity must be provided.");
      }

      // Check product availability
      const isAvailable = await this.checkProductAvailability(productId, variantId, quantity);
      if (!isAvailable) {
        throw new Error("Insufficient product stock.");
      }

      let cart = await this.findCartByUser(userId);

      // If the cart doesn't exist, create a new one
      if (!cart) {
        cart = await this.createCart({ userId, items: [] });
      }

      // Check if the item already exists in the cart
      const existingItemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId && item.variant.toString() === variantId
      );

      if (existingItemIndex >= 0) {
        // If it exists, update the quantity
        cart.items[existingItemIndex].quantity += Number(quantity);

        return await this.model.findOneAndUpdate(
          { user: userId },
          { items: cart.items }, // Update the entire items array
          { new: true }
        ).exec();
      } else {
        // If it doesn't exist, add the new item
        return await this.model.findOneAndUpdate(
          { user: userId },
          { $addToSet: { items: { product: productId, variant: variantId, quantity } } },
          { new: true }
        ).exec();
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw new Error("Could not add item to cart. Please check product details and try again.");
    }
  }


  async updateItemQuantity(userId: string, productId: string, variantId: string, quantity: number): Promise<IUserCart | null> {
    try {
      const updatedCart = await this.model.findOneAndUpdate(
        { user: userId, "items.product": productId, "items.variant": variantId },
        { $set: { "items.$.quantity": quantity } },
        { new: true }
      ).exec();

      if (!updatedCart) {
        throw new Error("Cart item not found.");
      }

      return updatedCart;
    } catch (error) {
      console.error("Error updating item quantity:", error);
      throw new Error("Could not update item quantity. Please check the item details.");
    }
  }

  async removeItemFromCart(userId: string, productId: string, variantId: string): Promise<IUserCart | null> {
    try {
      const updatedCart = await this.model.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { product: productId, variant: variantId } } },
        { new: true }
      ).exec();

      if (!updatedCart) {
        throw new Error("Cart item not found.");
      }

      return updatedCart;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw new Error("Could not remove item from cart. Please check the item details.");
    }
  }


  async findByCartId(cartId: mongoose.Types.ObjectId): Promise<IUserCart | null> {
    try {
      const cart = await this.model.findById(cartId)
        .populate('items.product')
        .populate('items.variant')
        .exec();

      if (!cart) {
        throw new Error(`Cart not found with ID: ${cartId}`);
      }

      return cart;
    } catch (error) {
      console.error("Error finding cart by ID:", error);
      throw new Error("Could not find cart. Please check the cart ID and try again.");
    }
  }
  async clearCart(userId: string): Promise<IUserCart | null> {
    try {
      const clearedCart = await this.model.findOneAndDelete({ user: userId }).exec();

      if (!clearedCart) {
        throw new Error("Cart not found.");
      }

      return clearedCart;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw new Error("Could not clear the cart. Please try again later.");
    }
  }
}
