import { Model } from "mongoose";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo"; 
import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository"; 

// Checkout repository extending the base repository
export class CheckoutRepository extends BaseRepository<ICheckout> implements ICheckoutRepo {
  constructor(model: Model<ICheckout>) {
    super(model);
  }

  async createCheckout(data: CheckoutDTO): Promise<ICheckout> {
    const checkoutEntity = { user: data.userId, cart: data.cartId, paymentMethod: data.paymentMethod };
    return await super.create(checkoutEntity);
  }
}
