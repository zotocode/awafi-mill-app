export interface ICloudinaryService {
    uploadProductImage(filePath: string): Promise<any>;
    uploadCategoryImage(filePath: string): Promise<any>;
  }
  