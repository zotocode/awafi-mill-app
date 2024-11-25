import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";

export default interface ICheckoutInteractor {
  processCheckout(data: CheckoutDTO): Promise<any>;
  getSecretKey(data:'Stripe'| 'Tabby' |'Tamara'):Promise<{secretKey:string}>
  getVerifyPayment(paymentMethod:'Stripe'| 'Tabby' |'Tamara',clientSecret:string):Promise<boolean>
}
