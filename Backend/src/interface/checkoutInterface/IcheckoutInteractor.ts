import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";

export default interface ICheckoutInteractor {
  processCheckout(data: CheckoutDTO): Promise<boolean>;
}
