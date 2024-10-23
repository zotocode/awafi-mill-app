import { IBannerInteractor } from "../../interface/bannerInterface/ibannerInteractor";
import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";
import { BannerModel } from "../../infrastructure/model/bannerModel"; // Import Banner Model
import { log } from "winston";

export class BannerInteractor implements IBannerInteractor {
  private cloudinaryService: ICloudinaryService;

  constructor(cloudinaryService: ICloudinaryService) {
    this.cloudinaryService = cloudinaryService;
  }

  // Add Offer or Welcome Banner with Cloudinary URL, startDate, endDate, and name
  async addOfferBanner(
    path: string,
    startDate: string,
    endDate: string,
    name: string,
    type: string
  ): Promise<any> {
    try {
      // Upload the image to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadOfferBaner(path);
      const imageUrl = uploadResult.secure_url;

      // Determine the correct field based on the type
      const bannerField =
        type === "Offer"
          ? "offerBanners"
          : type === "Welcome"
          ? "welcomeBanners"
          : "collectionBanners";

      // Add the new banner to the appropriate field in the database
      const banner = await BannerModel.findOneAndUpdate(
        {}, // Query (optional: find existing document)
        {
          $push: {
            [bannerField]: {
              // Use dynamic field name
              imageUrl,
              listed: true,
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              name, // Add the name here
            },
          },
        },
        { upsert: true, new: true } // Upsert and return the updated document
      );

      // Filter the result to only include listed banners
      const filteredBanners = banner[bannerField]
        .filter((banner) => banner.listed) // Only include banners where listed is true
        .map((banner) => ({
          imageUrl: banner.imageUrl,
          startDate: banner.startDate,
          endDate: banner.endDate,
          name: banner.name, // Include name in the response
        }));

      // Return only the filtered banner data
      return {
        [bannerField]: filteredBanners,
      };
    } catch (error) {
      console.error("Error in addOfferBanner:", error);
      // throw new Error(`Failed to add banner: ${error.message}`);
    }
  }

  async allBanners(): Promise<any> {
    try {
      const banners = await BannerModel.find().lean(); // Fetch all banners and convert to plain JavaScript objects

      // Map through the banners to remove the _id and other unwanted fields
      const filteredBanners = banners.map((banner) => {
        return {
          offerBanners: banner.offerBanners.map((offer) => ({
            imageUrl: offer.imageUrl,
            listed: offer.listed,
            startDate: offer.startDate,
            endDate: offer.endDate,
            name: offer.name,
          })),
          welcomeBanners: banner.welcomeBanners.map((welcome) => ({
            imageUrl: welcome.imageUrl,
            listed: welcome.listed,
            startDate: welcome.startDate,
            endDate: welcome.endDate,
            name: welcome.name,
          })),
          collectionBanners: banner.collectionBanners.map((collection) => ({
            imageUrl: collection.imageUrl,
            listed: collection.listed,
            startDate: collection.startDate,
            endDate: collection.endDate,
            name: collection.name,
          })),
          // You can add other fields if necessary
          createdAt: banner.createdAt,
          updatedAt: banner.updatedAt,
        };
      });

      console.log(filteredBanners, "filtered banner");

      return filteredBanners;
    } catch (error) {
      console.error("Error in allBanners:", error);
      // throw new Error(`Failed to retrieve banners: ${error.message}`);
    }
  }

  async toggleBannerListedStatus(imageUrl: string, name: string): Promise<any> {
    console.log(imageUrl, "image url", name, "name");
    try {
      // Find the banner with the matching imageUrl and name in offerBanners, welcomeBanners, or collectionBanners
      const banner = await BannerModel.findOne({
        $or: [
          { "offerBanners.imageUrl": imageUrl, "offerBanners.name": name },
          { "welcomeBanners.imageUrl": imageUrl, "welcomeBanners.name": name },
          {
            "collectionBanners.imageUrl": imageUrl,
            "collectionBanners.name": name,
          },
        ],
      });

      if (!banner) {
        console.log("Banner not found");
        return null;
      }

      // Check if the banner is in offerBanners, welcomeBanners, or collectionBanners and toggle the 'listed' field
      const offerBanner = banner.offerBanners.find(
        (b) => b.imageUrl === imageUrl && b.name === name
      );
      const welcomeBanner = banner.welcomeBanners.find(
        (b) => b.imageUrl === imageUrl && b.name === name
      );
      const collectionBanner = banner.collectionBanners.find(
        (b) => b.imageUrl === imageUrl && b.name === name
      );

      let newListedStatus;
      if (offerBanner) {
        newListedStatus = !offerBanner.listed; // Toggle the listed status for offerBanner
      } else if (welcomeBanner) {
        newListedStatus = !welcomeBanner.listed; // Toggle the listed status for welcomeBanner
      } else if (collectionBanner) {
        newListedStatus = !collectionBanner.listed; // Toggle the listed status for collectionBanner
      } else {
        console.log("Banner not found in any category");
        return null;
      }

      // Update the 'listed' field based on the new status
      const updatedBanner = await BannerModel.findOneAndUpdate(
        {
          $or: [
            { "offerBanners.imageUrl": imageUrl, "offerBanners.name": name },
            {
              "welcomeBanners.imageUrl": imageUrl,
              "welcomeBanners.name": name,
            },
            {
              "collectionBanners.imageUrl": imageUrl,
              "collectionBanners.name": name,
            },
          ],
        },
        {
          $set: {
            "offerBanners.$[offer].listed": newListedStatus,
            "welcomeBanners.$[welcome].listed": newListedStatus,
            "collectionBanners.$[collection].listed": newListedStatus, // Set the listed status for collectionBanner
          },
        },
        {
          arrayFilters: [
            { "offer.imageUrl": imageUrl, "offer.name": name },
            { "welcome.imageUrl": imageUrl, "welcome.name": name },
            { "collection.imageUrl": imageUrl, "collection.name": name }, // Filter for collectionBanner
          ],
          new: true,
        }
      );

      console.log("Banner listed status toggled successfully");
      return updatedBanner;
    } catch (error) {
      console.error("Error in toggleBannerListedStatus:", error);
      // throw new Error(`Failed to toggle banner status: ${error.message}`);
    }
  }

  async viewWelcomeBanner(): Promise<any> {
    try {
      // Fetch the banner document(s)
      const banners = await BannerModel.find(
        {}, // You can modify this query if needed to filter specific documents
        { welcomeBanners: 1 } // Only return the welcomeBanners field
      ).lean(); // Convert to plain JavaScript objects
  
      // Map through the banners and filter for listed welcome banners
      const welcomeBanners = banners.flatMap((banner) =>
        banner.welcomeBanners
          .filter((welcome) => welcome.listed) // Filter for listed welcome banners
          .map((welcome) => ({
            imageUrl: welcome.imageUrl,
            name: welcome.name,
          }))
      );
      return welcomeBanners; 
    } catch (error) {
      console.error("Error in viewWelcomeBanner:", error)
    }
  }

  async viewOfferBanner(): Promise<any> {
    try {
      // Fetch the banner document(s)
      const banners = await BannerModel.find(
        {}, // You can modify this query if needed to filter specific documents
        { offerBanners: 1 } // Only return the welcomeBanners field
      ).lean(); // Convert to plain JavaScript objects
  
      // Map through the banners and filter for listed welcome banners
      const offerBanners = banners.flatMap((banner) =>
        banner.offerBanners
          .filter((offer) => offer.listed) // Filter for listed welcome banners
          .map((welcome) => ({
            imageUrl: welcome.imageUrl,
            name: welcome.name,
          }))
      );
      return offerBanners; 
    } catch (error) {
      console.error("Error in viewWelcomeBanner:", error)
    }
  }


  async viewCollectionBanner(): Promise<any> {
    try {
      // Fetch the banner document(s)
      const banners = await BannerModel.find(
        {}, // You can modify this query if needed to filter specific documents
        { collectionBanners: 1 } // Only return the welcomeBanners field
      ).lean(); // Convert to plain JavaScript objects
  
      // Map through the banners and filter for listed welcome banners
      const collectionBanners = banners.flatMap((banner) =>
        banner.collectionBanners
          .filter((collection) => collection.listed) // Filter for listed welcome banners
          .map((welcome) => ({
            imageUrl: welcome.imageUrl,
            name: welcome.name,
          }))
      );
      return collectionBanners; 
    } catch (error) {
      console.error("Error in viewWelcomeBanner:", error)
    }
  }
  
}
