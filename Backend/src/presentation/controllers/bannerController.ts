import { NextFunction, Request, Response } from "express";
import { IBannerInteractor } from "../../interface/bannerInterface/ibannerInteractor";

export class BannerController {
  private bannerInteractor: IBannerInteractor;

  constructor(bannerInteractor: IBannerInteractor) {
    this.bannerInteractor = bannerInteractor;
  }

  async addOfferBanner(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("File uploaded:", req.file);
      console.log("Start Date:", req.body.startDate);
      console.log("End Date:", req.body.endDate);

      // Pass the uploaded file path, startDate, and endDate to the interactor
      const response = await this.bannerInteractor.addOfferBanner(
        req.file?.path || '',
        req.body.startDate,
        req.body.endDate
      );

      res.status(200).json({
        message: "Banner added successfully",
        data: response, // Optional: send back saved banner info
      });
    } catch (error) {
      console.error("Error in addOfferBanner:", error);
      next(error); // Forward the error to centralized error handling
    }
  }
}
