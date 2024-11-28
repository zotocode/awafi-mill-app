// application/interactor/checkoutInteractor.ts
import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO ,CheckoutCreateDTO} from "../../domain/dtos/CheckoutDTO";
import { IproductRepo } from "../../interface/productInterface/IproductRepo"; // Import IproductRepo
import mongoose from "mongoose";
import envConfig from "../../config/env";
import { IUserCart } from "../../domain/entities/userCartSchema";
import { IPaymentGateway } from "../../infrastructure/paymentGateways/IPaymentGateway";
import { IProductDetails } from "../../domain/dtos/CartDTO";
import { generateRandomId } from "../services/genaralService";


export class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo: ICartRepo;
    private checkoutRepo: ICheckoutRepo;
    private productRepo: IproductRepo; // Declare productRepo
    private stripePaymentGateway:IPaymentGateway
    private taabyPaymentGateway:IPaymentGateway
 

    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo, stripePaymentGateway:IPaymentGateway, taabyPaymentGateway:IPaymentGateway) {
        this.cartRepo = cartRepo;
        this.checkoutRepo = checkoutRepo;
        this.productRepo = productRepo; 
        this.stripePaymentGateway=stripePaymentGateway
        this.taabyPaymentGateway=taabyPaymentGateway
    }

    async  getSecretKey(paymentMethod:'Stripe'| 'Tabby' |'Tamara'):Promise<{secretKey:string}>
    {

        if(paymentMethod==="Tabby")
        {
            return {secretKey:envConfig.RAZORPAY_SECRET_KEY as string}
        }
        else if(paymentMethod==="Stripe")
        {
            
            return {secretKey:envConfig.STRIPE_SECRET_KEY as string}
        } else if(paymentMethod=="Tamara")
        {
            return{secretKey:"no value"}
        }
        return{secretKey:"no value"}
    }
    async getVerifyPayment(paymentMethod:'Stripe'| 'Tabby' |'Tamara',paymentIntentsId:string):Promise<boolean>
    {
        if(paymentMethod==="Tabby")
            {
                return true
            }
            else if(paymentMethod==="Stripe")
            {
                return this.stripePaymentGateway.verifyPayment(paymentIntentsId)
            } else if(paymentMethod=="Tamara")
            {
                return true
            }
        
  return false
    }
   
    async processCheckout({
        userId,
        shippingAddress,
        paymentMethod,
        currency,
        amount,
        transactionId,
        paymentStatus,
      }: CheckoutDTO): Promise<any> {
        // Step 1: Retrieve cart items
        const response = await this.cartRepo.findCartByUser(userId);
        const inPrice = /aed/i.test(currency);
        
        const cartItems = response?.map((e) => {
          return {
            productId: e.productId,
            variantId: e.variantId,
            name: e.name,
            weight: e.weight,
            quantity: e.quantity,
            price: inPrice ? e.inPrice : e.outPrice,
            images: e.images,
          };
        });
      
        if (!cartItems) {
          throw new Error("Cart not found or no items in the cart");
        }
      
        let orderId: string;

        do {
          orderId = generateRandomId(10); 
        } while (await this.checkoutRepo.fetchdataByOrderId(orderId)); 
       
      
        // Step 3: Convert user ID to ObjectId
        const userInObjectId = new mongoose.Types.ObjectId(userId);
      
        // Step 4: Create checkout data
        const data: CheckoutCreateDTO = {
          user: userInObjectId,
          orderId:orderId, // Use the unique orderId here
          currency,
          paymentMethod,
          orderPlacedAt: new Date(),
          items: cartItems,
          shippingAddress,
          amount,
          transactionId,
          paymentStatus,
          deliveredAt: (() => {
            const date = new Date();
            date.setDate(date.getDate() + 5); // Add 5 days to the current date
            return date;
          })(),
        };
      
        // Step 5: Save checkout data
        const checkout = await this.checkoutRepo.createCheckout(data);
      
        // Step 6: Clear the cart after successful checkout (optional)
        // await this.cartRepo.clearCart(userId);
      
        // Step 7: Return the checkout result
        return checkout;
      }
      

}