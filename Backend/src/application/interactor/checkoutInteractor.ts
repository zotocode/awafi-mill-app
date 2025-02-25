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
    async processCheckout({
      userId,
      shippingAddress,
      paymentMethod,
      currency,
    }: CheckoutDTO): Promise<any> {
      // Step 1: Retrieve cart items
      const response = await this.cartRepo.findCartByUser(userId);
      const inPrice = /aed/i.test(currency);
      const totalAmount = Array.isArray(response)
        ? response.reduce((acc, item) => acc + (inPrice ? item.inPrice * item.quantity : item.outPrice *item.quantity), 0)
        : 0;
  
      if (!response || response.length === 0) {
        throw new Error("Cart not found or empty");
      }

      console.log("Total amount here 🚀🚀🚀🚀 :",totalAmount)
  
      const cartItems = response.map((e) => ({
        productId: e.productId,
        variantId: e.variantId,
        name: e.name,
        weight: e.weight,
        quantity: e.quantity,
        price: inPrice ? e.inPrice : e.outPrice,
        images: e.images,
      }));
  
      let orderId: string;
      do {
        orderId = generateRandomId(10);
      } while (await this.checkoutRepo.fetchdataByOrderId(orderId));
  
      // Convert user ID to ObjectId
      const userInObjectId = new mongoose.Types.ObjectId(userId);
  
     let  paymentIntentId="0"
  
      // Step 2: Create Payment Intent for Stripe or Tabby
      if (paymentMethod === "Stripe") {
        const payment = await this.stripePaymentGateway.createPaymentIntent(totalAmount, currency);
        paymentIntentId = payment.paymentIntentId;
      } else if (paymentMethod === "Tabby") {
        const payment = await this.taabyPaymentGateway.createPaymentIntent(totalAmount, currency);
        paymentIntentId = payment.paymentIntentId;
      }
  
      // Step 3: Save checkout data
      const checkoutData: CheckoutCreateDTO = {
        user: userInObjectId,
        orderId,
        currency,
        paymentMethod,
        orderPlacedAt: new Date(),
        items: cartItems,
        shippingAddress,
        amount: totalAmount,
        transactionId: paymentIntentId,
        paymentStatus: "pending",
        deliveredAt: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 5);
          return date;
        })(),
      };
  
      const checkout = await this.checkoutRepo.createCheckout(checkoutData);
  
      // Step 4: Clear the cart
      // await this.cartRepo.clearCart(userId);
  
      // Step 5: Return checkout result with payment credentials
      return {
        checkout,
        paymentSecret: paymentMethod === "Stripe" ? checkoutData.transactionId : null,
        paymentIntentId
      };
    }
  
    /**
     * Verifies payment after completion
     */
    async verifyPayment(paymentMethod: "Stripe" | "Tabby", paymentIntentsId: string): Promise<{success:boolean,message:string}> {
      if (paymentMethod === "Stripe") {
        return this.stripePaymentGateway.verifyPayment(paymentIntentsId);
      } else if (paymentMethod === "Tabby") {
        return this.taabyPaymentGateway.verifyPayment(paymentIntentsId);
      }
      return {success:false,message:"Payment is failed or payment method is not allowed"}
    }
      

}