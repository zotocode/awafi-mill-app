// src/interface/cartInterface/IcartRepo.ts
import mongoose from "mongoose";
import { CartDTO } from "../../domain/dtos/CartDTO";
import { IUserCart } from "../../domain/entities/userCartSchema";


// Cart repository interface
export default interface ICartRepo {
  createCart(data: CartDTO): Promise<IUserCart>;
  findCartByUser(userId: string): Promise<IUserCart | null>;
  addItemToCart(userId: string, productId: string, variantId: string, quantity: number): Promise<IUserCart | null>;
  updateItemQuantity(userId: string, productId: string, variantId: string, quantity: number): Promise<IUserCart | null>;
  removeItemFromCart(userId: string, productId: string, variantId: string): Promise<IUserCart | null>;
  clearCart(userId: string): Promise<IUserCart | null>;
  findByCartId(cartId:mongoose.Types.ObjectId):Promise<IUserCart | null>
}
