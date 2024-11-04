// application/interactor/checkoutInteractor.ts
import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO ,CheckoutCreateDTO} from "../../domain/dtos/CheckoutDTO";
import { IUserCart } from "../../domain/entities/userCartSchema";
import { IPaymentGateway } from "../../infrastructure/paymentGateways/IPaymentGateway";
import { IproductRepo } from "../../interface/productInterface/IproductRepo"; // Import IproductRepo
import mongoose from "mongoose";

export class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo: ICartRepo;
    private checkoutRepo: ICheckoutRepo;
    private productRepo: IproductRepo; // Declare productRepo
    private paymentGateway: IPaymentGateway; // Payment gateway dependency

    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo, paymentGateway: IPaymentGateway) {
        this.cartRepo = cartRepo;
        this.checkoutRepo = checkoutRepo;
        this.productRepo = productRepo; // Initialize productRepo
        this.paymentGateway = paymentGateway; // Initialize payment gateway
    }

    async processCheckout(data: CheckoutDTO): Promise<boolean> {
        const cart: IUserCart | null = await this.cartRepo.findCartByUser(data.userId);

        if (!cart) throw new Error("Cart not found");

        
    

        const checkoutData:CheckoutCreateDTO = {
            user:new mongoose.Types.ObjectId(data.userId),
            amount:data.amount,
            paymentMethod:data.paymentMethod,
            orderPlacedAt:new Date(data.time),
            deliveredAt:new Date(new Date(data.time).getTime() + 7 * 24 * 60 * 60 * 1000),
            cart:cart._id as mongoose.Types.ObjectId,
            items:cart.items,
            currency:data.currency
        }; // add any details if want - abhishek 
        checkoutData.cart=cart._id as mongoose.Types.ObjectId
        // Set deliveredAt to 7 days after the provided time in data.time
       checkoutData.deliveredAt = new Date(new Date(data.time).getTime() + 3 * 24 * 60 * 60 * 1000);

        const checkoutResult = await this.checkoutRepo.createCheckout(checkoutData);
      let otherOptions={}
 
        // Check payment method
        switch (data.paymentMethod) {
            case 'COD':
                // Handle Cash on Delivery
                // checkoutResult.status = 'Pending'; // Set status for COD
                break;
    
            case 'Razorpay':
                // For Razorpay payment
                const razorpayOptions = {razorpay_id:'asdfasd'}; // Add any specific options for Razorpay if needed
                 otherOptions={}
                const razorpayResponse = await this.paymentGateway.initiatePayment(checkoutResult.amount, checkoutResult.currency, razorpayOptions,otherOptions);
                if (!razorpayResponse) {
                    throw new Error('Razorpay payment initiation failed');
                }
                // checkoutResult.status = 'Paid'; // Update status to reflect payment success
                break;
    
            case 'Stripe':
                // For Stripe payment
                const stripeOptions = {stripe_id:data.stripe_id}; // Add any specific options for Stripe if needed
                 otherOptions={products:data.products,order:checkoutResult}
                const stripeResponse = await this.paymentGateway.initiatePayment(checkoutResult.amount, checkoutResult.currency, stripeOptions,otherOptions);
                if (!stripeResponse) {
                    throw new Error('Stripe payment initiation failed');
                }
                // checkoutResult.status = 'Paid'; // Update status to reflect payment success
                break;
    
            default:
                throw new Error('Invalid payment method');
        }

        // Initiate payment
        // const paymentResponse = await this.paymentGateway.initiatePayment(checkoutResult.amount, checkoutResult.currency);

        // Store payment information in the checkout record if needed (not implemented here)

        // Clear cart after successful checkout
        // await this.cartRepo.clearCart(data.user.toString());

        // Reduce product quantities
        // for (const item of cart.items) {
        //     const productId = new mongoose.Types.ObjectId(item.product);
        //     await this.productRepo.updateVariantQuantity(productId.toString(), {
        //         $inc: { "variants.$[variant].stockQuantity": -item.quantity } 
        //     }, { arrayFilters: [{ "variant._id": item.product }] });
        // }

        return true; // Indicate success
    }
}
