// application/interactor/checkoutInteractor.ts
import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO ,CheckoutCreateDTO} from "../../domain/dtos/CheckoutDTO";
import { IUserCart } from "../../domain/entities/userCartSchema";
import { IPaymentGateway } from "../../infrastructure/paymentGateways/IPaymentGateway";
import { IproductRepo } from "../../interface/productInterface/IproductRepo"; // Import IproductRepo
import mongoose from "mongoose";
import envConfig from "../../config/env";

export class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo: ICartRepo;
    private checkoutRepo: ICheckoutRepo;
    private productRepo: IproductRepo; // Declare productRepo
 

    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo) {
        this.cartRepo = cartRepo;
        this.checkoutRepo = checkoutRepo;
        this.productRepo = productRepo; // Initialize productRepo
       
    }

    async  getSecretKey(paymentMethod:'Razorpay'| 'Stripe'):Promise<{secretKey:string}>
    {

        console.log("payment method",paymentMethod)
        if(paymentMethod==="Razorpay")
        {
            return {secretKey:envConfig.RAZORPAY_SECRET_KEY as string}
        }
        else if(paymentMethod==="Stripe")
        {
            
            return {secretKey:envConfig.STRIPE_SECRET_KEY as string}
        }
        return{secretKey:"no value"}
    }
    async processCheckout(data: CheckoutDTO): Promise<any> {
        // Find the user's cart
        const cart: IUserCart | null = await this.cartRepo.findCartByUser(data.userId);
        if (!cart) throw new Error("Cart not found");
    
        // Prepare the checkout data to be saved
        const checkoutData: CheckoutCreateDTO = {
            user: new mongoose.Types.ObjectId(data.userId),
            amount: data.amount,
            paymentMethod: data.paymentMethod,
            orderPlacedAt: new Date(data.time),
            deliveredAt: new Date(new Date(data.time).getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days after order time
            cart: cart._id as mongoose.Types.ObjectId,
            items: cart.items,
            currency: data.currency,
            shippingAddress: data.shippingAddress,  // Add shipping address
            transactionId: data.transactionId,      // Add transaction ID
            paymentStatus: data.paymentStatus       // Set initial payment status
        };
    
        // Save the checkout data in the database
        const checkoutResult = await this.checkoutRepo.createCheckout(checkoutData);
    
        // Clear the cart after successful checkout
        await this.cartRepo.clearCart(data.userId);
    
        return checkoutResult; // Return checkout result for frontend reference
    }
    

}