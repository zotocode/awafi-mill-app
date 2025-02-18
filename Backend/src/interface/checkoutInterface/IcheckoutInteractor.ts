import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";

export default interface ICheckoutInteractor {
  processCheckout(data: CheckoutDTO): Promise<any>;
  getSecretKey(data:'Stripe'| 'Tabby' |'Tamara'):Promise<{secretKey:string}>
  verifyPayment(paymentMethod:'Stripe'| 'Tabby' |'Tamara',paymentIndent:string):Promise<{success:boolean,message:string}>
}
