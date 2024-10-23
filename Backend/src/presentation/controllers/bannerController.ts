import { NextFunction, Request, Response } from "express";
import { IBannerInteractor } from "../../interface/bannerInterface/ibannerInteractor";
import { log } from "winston";

export class BannerController {
  private bannerInteractor: IBannerInteractor;

  constructor(bannerInteractor: IBannerInteractor) {
    this.bannerInteractor = bannerInteractor;
  }

  async addOfferBanner(req: Request, res: Response, next: NextFunction) {
    try {
      // Ensure the file exists and retrieve its path
      const filePath = req.file?.path;
      const { startDate, endDate, name ,type } = req.body; // Destructure name

      // Validate input data
      if (!filePath || !startDate || !endDate || !name) { // Added name validation
        return res.status(400).json({ message: "File, startDate, endDate, and name are required" });
      }

      // Call the interactor to add the offer banner and get the filtered response
      const filteredResponse = await this.bannerInteractor.addOfferBanner(filePath, startDate, endDate, name ,type);

      // Send the filtered offer banner data back to the client
      res.status(200).json({
        message: "Banner added successfully",
        data: filteredResponse,
      });
    } catch (error) {
      // Log the error and forward it to the next middleware for centralized error handling
      console.error("Error in addOfferBanner:", error);
      next(error);
    }
  }

  async allBanners(req: Request, res: Response, next: NextFunction) {
    try {
      const banners = await this.bannerInteractor.allBanners();
      res.status(200).json(banners); // Return the filtered banners
  } catch (error) {
      console.error('Error fetching banners:', error);
  }
}


async unlistBanner(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("Reached controller", req.body.imageUrl, req.body.name);
    const banners = await this.bannerInteractor.toggleBannerListedStatus(req.body.imageUrl, req.body.name);
    
    if (!banners) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res.status(200).json({ message: "Banner listed status toggled successfully", banners });
  } catch (error) {
    console.error('Error toggling banner status:', error);
    return res.status(500).json({ message: "An error occurred while toggling banner status" });
  }
}

async welcomeBanners(req: Request, res: Response, next: NextFunction) {
  try {
    const banners = await this.bannerInteractor.viewWelcomeBanner();

    // Send a success response with banners
    return res.status(200).json({
      success: true,
      banners: banners, // Return the array of welcome banners
    });
  } catch (error) {
    console.error("Error retrieving welcome banners:", error);

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve welcome banners',
    });
  }
}

async offerBanners(req: Request, res: Response, next: NextFunction) {
  try {
    const banners = await this.bannerInteractor.viewOfferBanner();

    // Send a success response with banners
    return res.status(200).json({
      success: true,
      banners: banners, // Return the array of welcome banners
    });
  } catch (error) {
    console.error("Error retrieving welcome banners:", error);

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve welcome banners',
    });
  }
}



async collectionBanners(req: Request, res: Response, next: NextFunction) {
  try {
    const banners = await this.bannerInteractor.viewCollectionBanner();

    // Send a success response with banners
    return res.status(200).json({
      success: true,
      banners: banners, // Return the array of welcome banners
    });
  } catch (error) {
    console.error("Error retrieving welcome banners:", error);

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve welcome banners',
    });
  }
}


}
