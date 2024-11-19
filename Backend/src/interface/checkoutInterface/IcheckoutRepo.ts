import { CheckoutCreateDTO } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { OrderSummary,RevenueSummary } from "../../domain/dtos/CheckoutDTO";

export default interface ICheckoutRepo {
  createCheckout(data: CheckoutCreateDTO): Promise<ICheckout>;
  
}
