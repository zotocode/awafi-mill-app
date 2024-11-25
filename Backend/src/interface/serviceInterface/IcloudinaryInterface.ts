export interface ICloudinaryService {
    uploadProductImage(filePath: string): Promise<any>;
    uploadOfferBaner(filePath:string):Promise<any>
    uploadCategoryImage(filePath: string): Promise<any>;
    uploadSubCategoryImage(filePath: string): Promise<any>;
  }
  
