export interface ICloudinaryService {
    uploadProductImage(filePath: string): Promise<any>;
    uploadOfferBaner(filePath:string):Promise<any>
  }