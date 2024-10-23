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
      const checkoutData: CheckoutDTO = req.body;
      await this.checkoutInteractor.processCheckout(checkoutData);
      res.status(200).json({ message: "Checkout successful!" });
    } catch (error) {
      next(error);
    }
  }
}
