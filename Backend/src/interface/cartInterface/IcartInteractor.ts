// src/interface/cartInterface/IcartInteractor.ts
import { CartDTO, AddToCartDTO, UpdateCartQuantityDTO, RemoveFromCartDTO } from "../../domain/dtos/CartDTO";

// Cart interactor interface
export default interface ICartInteractor {
  createCart(data: CartDTO): Promise<CartDTO>;
  getCartByUserId(userId: string): Promise<CartDTO | null>;
  addItemToCart(data: AddToCartDTO): Promise<CartDTO | null>;
  updateCartItemQuantity(data: UpdateCartQuantityDTO): Promise<CartDTO | null>;
  removeItemFromCart(data: RemoveFromCartDTO): Promise<CartDTO | null>;
  deleteCart(userId: string): Promise<boolean>;
}
