import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";

export default interface ICheckoutRepo {
  createCheckout(data: CheckoutDTO): Promise<ICheckout>;
}
