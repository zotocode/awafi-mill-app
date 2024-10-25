import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { OrderSummary,RevenueSummary } from "../../domain/dtos/CheckoutDTO";

export default interface ICheckoutRepo {
  createCheckout(data: CheckoutDTO): Promise<ICheckout>;
  viewAllorders():Promise<OrderSummary[]>
  viewRevenue(period:string|undefined):Promise<RevenueSummary[]>
}
