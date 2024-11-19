import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import { BaseRepository } from "./baseRepository";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { CheckoutCreateDTO} from "../../domain/dtos/CheckoutDTO";
import { Model } from "mongoose";




export class CheckoutRepository extends BaseRepository<ICheckout> implements ICheckoutRepo {
    constructor(model: Model<ICheckout>) {
      super(model);
    }
  
    async createCheckout(data:CheckoutCreateDTO ): Promise<ICheckout> {
     
      return await super.create(data);
    }
}