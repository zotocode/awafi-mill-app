// src/application/interactor/cartInteractor.ts
import { CartRepository } from "../../infrastructure/repositories/cartRepo";
import ICartInteractor from "../../interface/cartInterface/IcartInteractor";
import { CartDTO, AddToCartDTO, UpdateCartQuantityDTO, RemoveFromCartDTO } from "../../domain/dtos/CartDTO";
import { IUserCart } from "../../domain/entities/userCartSchema";

export class CartInteractor implements ICartInteractor {
  private cartRepo: CartRepository;

  constructor(cartRepo: CartRepository) {
    this.cartRepo = cartRepo;
  }

  async createCart(data: CartDTO): Promise<CartDTO> {
    const cart = await this.cartRepo.createCart(data);
    return this.mapToDTO(cart);
  }

  async getCartByUserId(userId: string): Promise<CartDTO | null> {
    const cart = await this.cartRepo.findCartByUser(userId);
    return cart ? this.mapToDTO(cart) : null;
  }

  async addItemToCart(data: AddToCartDTO): Promise<CartDTO | null> {
    const updatedCart = await this.cartRepo.addItemToCart(data.userId, data.productId, data.quantity);
    return updatedCart ? this.mapToDTO(updatedCart) : null;
  }

  async updateCartItemQuantity(data: UpdateCartQuantityDTO): Promise<CartDTO | null> {
    const updatedCart = await this.cartRepo.updateItemQuantity(data.userId, data.productId, data.quantity);
    return updatedCart ? this.mapToDTO(updatedCart) : null;
  }

  async removeItemFromCart(data: RemoveFromCartDTO): Promise<CartDTO | null> {
    const updatedCart = await this.cartRepo.removeItemFromCart(data.userId, data.productId);
    return updatedCart ? this.mapToDTO(updatedCart) : null;
  }

  async deleteCart(userId: string): Promise<boolean> {
    const deletedCart = await this.cartRepo.clearCart(userId);
    return !!deletedCart;
  }

  private mapToDTO(iCart: IUserCart): CartDTO {
    return {
      userId: iCart.user.toString(),
      items: iCart.items.map(item => ({ productId: item.product.toString(), quantity: item.quantity })),
    };
  }
}

