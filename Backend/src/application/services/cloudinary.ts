import { uploader } from "../../config/cloudinary";
import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";
import { promises as fs } from 'fs';

class CloudinaryService implements ICloudinaryService{
  private uploader: any;

  constructor() {
    this.uploader = uploader;

  }

  // Uploads a product image to the 'ProductImages' folder
  async uploadProductImage(filePath: string): Promise<any> {
    try {
      const result = await this.uploader.upload(filePath, {
        folder: 'ProductImages',
        resource_type: 'auto', // Automatically detects the file type
      });
        // Remove the image from local storage after successful upload
        await fs.unlink(filePath);
      return result;
    } catch (error:any) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  //uploadofferBanner
  async uploadOfferBaner(filePath: string): Promise<any> {
    try {
      const result = await this.uploader.upload(filePath, {
        folder: 'offerBanner',
        resource_type: 'auto', // Automatically detects the file type
      });
        // Remove the image from local storage after successful upload
        await fs.unlink(filePath);
      return result;
    } catch (error:any) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

}

export default CloudinaryService;