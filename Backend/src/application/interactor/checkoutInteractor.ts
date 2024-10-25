// application/interactor/checkoutInteractor.ts
import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
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

        // Check inventory for each product in the cart 
        for (const item of cart.items) {
            const productId = new mongoose.Types.ObjectId(item.product);
            const product = await this.productRepo.productFindById(productId);
            if (!product || product.variants[0].stockQuantity < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product?.name}`);
            }
        }

        const checkoutData = { ...data }; // add any details if want - abhishek 
        const checkoutResult = await this.checkoutRepo.createCheckout(checkoutData);


        // Check payment method
        switch (data.paymentMethod) {
            case 'COD':
                // Handle Cash on Delivery
                // checkoutResult.status = 'Pending'; // Set status for COD
                break;
    
            case 'Razorpay':
                // For Razorpay payment
                const razorpayOptions = {}; // Add any specific options for Razorpay if needed
                const razorpayResponse = await this.paymentGateway.initiatePayment(checkoutResult.amount, checkoutResult.currency, razorpayOptions);
                if (!razorpayResponse) {
                    throw new Error('Razorpay payment initiation failed');
                }
                // checkoutResult.status = 'Paid'; // Update status to reflect payment success
                break;
    
            case 'Stripe':
                // For Stripe payment
                const stripeOptions = {}; // Add any specific options for Stripe if needed
                const stripeResponse = await this.paymentGateway.initiatePayment(checkoutResult.amount, checkoutResult.currency, stripeOptions);
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
        await this.cartRepo.clearCart(data.userId);

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
