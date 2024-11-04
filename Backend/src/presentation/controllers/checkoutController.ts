// presentation/controllers/checkoutController.ts
import { NextFunction, Request, Response } from "express";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";

export class CheckoutController {
  private checkoutInteractor: ICheckoutInteractor;

  constructor(checkoutInteractor: ICheckoutInteractor) {
    this.checkoutInteractor = checkoutInteractor;
  }

  async checkout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
  
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const data: CheckoutDTO = req.body;
      data.userId = userId;

      const checkoutResponse=await this.checkoutInteractor.processCheckout(data);
      res.status(200).json(checkoutResponse)
    } catch (error) {
      next(error);
    }
  }
  async getSecretKey(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const PaymentMethod=req.query.paymentMethod as "Razorpay" | "Stripe"
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
       
      const checkoutResponse=await this.checkoutInteractor.getSecretKey(PaymentMethod);
      res.status(200).json(checkoutResponse)
    } catch (error) {
      next(error);
    }
  }
}
