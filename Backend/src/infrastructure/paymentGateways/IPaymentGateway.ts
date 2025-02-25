export interface IPaymentGateway {
  /**
   * Creates a payment intent for the given amount and currency.
   * @param amount - Total amount to be paid.
   * @param currency - Currency code (e.g., "usd", "aed").
   * @returns Promise containing clientSecret and paymentIntentId.
   */
  createPaymentIntent(amount: number, currency: string): Promise<{ clientSecret: string; paymentIntentId: string }>;

  /**
   * Verifies if a payment was successful.
   * @param paymentIntentsId - The ID of the payment intent.
   * @returns Promise<boolean> indicating success or failure.
   */
  verifyPayment(paymentIntentsId: string): Promise<{success:boolean,message:string}>;
}
