import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO, CheckoutCreateDTO } from "../../domain/dtos/CheckoutDTO";
import { IUserCart } from "../../domain/entities/userCartSchema";
import { IPaymentGateway } from "../../infrastructure/paymentGateways/IPaymentGateway";
import { IproductRepo } from "../../interface/productInterface/IproductRepo"; // Import IproductRepo
import mongoose from "mongoose";
import envConfig from "../../config/env";
import { StripePaymentGateway } from "../../infrastructure/paymentGateways/StripeGateway";
import { RazorpayPaymentGateway } from "../../infrastructure/paymentGateways/RazorpayPaymentGateway";

export class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo: ICartRepo;
    private checkoutRepo: ICheckoutRepo;
    private productRepo: IproductRepo;
    private paymentGateway: IPaymentGateway;

    constructor(
        cartRepo: ICartRepo,
        checkoutRepo: ICheckoutRepo,
        productRepo: IproductRepo
    ) {
        this.cartRepo = cartRepo;
        this.checkoutRepo = checkoutRepo;
        this.productRepo = productRepo;
        this.paymentGateway = null as any; // Initialize with null, it will be set dynamically
    }

    // Get the secret key for the chosen payment gateway
    async getSecretKey(paymentMethod: "Razorpay" | "Stripe"): Promise<{ secretKey: string }> {
        if (paymentMethod === "Razorpay") {
            return { secretKey: envConfig.RAZORPAY_SECRET_KEY as string };
        } else if (paymentMethod === "Stripe") {
            return { secretKey: envConfig.STRIPE_SECRET_KEY as string };
        }
        return { secretKey: "no value" };
    }

    // Set the appropriate payment gateway based on the payment method
    private setPaymentGateway(paymentMethod: "Razorpay" | "Stripe" | "COD") {
        if (paymentMethod === "Razorpay") {
            this.paymentGateway = new RazorpayPaymentGateway();
        } else if (paymentMethod === "Stripe") {
            this.paymentGateway = new StripePaymentGateway();
        }
    }

    // Process the checkout, initiate payment, and store the result
    async processCheckout(data: CheckoutDTO): Promise<any> {
        const { amount, paymentMethod, currency, shippingAddress, paymentStatus ,userId} = data;

        // Set the appropriate payment gateway based on the payment method selected
        this.setPaymentGateway(paymentMethod);

        if (!this.paymentGateway) {
            throw new Error("Invalid payment method");
        }

        const cart: IUserCart | null = await this.cartRepo.findCartByUser(userId);
        if (!cart) throw new Error("Cart not found");

        const productItemsWithDetails = await Promise.all(
            cart.items.map(async (item) => {
                const product = await this.productRepo.findByIdAndVariantId(item.product, item.variant);
                if (product) {
                    const variant = product.variants.find(
                        (v) => v._id && v._id.toString() === item.variant.toString()
                    );
                    if (variant) {
                        return {
                            name: product.name,
                            quantity: item.quantity,
                            inPrice: variant.inPrice,
                            outPrice: variant.outPrice,
                            weight: variant.weight,
                        };
                    }
                }
                return null;
            })
        );

        const filteredItems = productItemsWithDetails.filter((item) => item !== null) as any[];
        

        // Initiate payment based on the selected payment method
        let paymentResponse;
        try {
            paymentResponse = await this.paymentGateway.initiatePayment({
                items: filteredItems,
                shippingAddress,
            });
        } catch (error) {
            throw new Error("Payment initiation failed: " + error.message);
        }

        // Prepare the checkout data to be saved in the database
        const checkoutData: CheckoutCreateDTO = {
            user: new mongoose.Types.ObjectId(data.userId),
            amount: amount,
            paymentMethod: paymentMethod,
            orderPlacedAt: new Date(data.time),
            deliveredAt: new Date(new Date(data.time).getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days after order time
            cart: cart._id as mongoose.Types.ObjectId,
            items: cart.items,
            currency: currency,
            shippingAddress: shippingAddress,
    
        };

        // Save the checkout data in the database
        const checkoutResult = await this.checkoutRepo.createCheckout(checkoutData);

        // Return checkout and payment response
        return {paymentResponse };
    }
}
