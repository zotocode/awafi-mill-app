import { IBannerInteractor } from "../../interface/bannerInterface/ibannerInteractor";
import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";

export class BannerInteractor implements IBannerInteractor{
    private cloudinaryService :ICloudinaryService
    constructor(cloudinaryService :ICloudinaryService){
           this.cloudinaryService = cloudinaryService
    }

    async addOfferBanner(path: string, startDate: string, endDate: string): Promise<any> {
        console.log('============interactor========================');
        console.log(path,startDate,endDate);
        console.log('====================================');   
       const result =  this.cloudinaryService.uploadOfferBaner(path) 
        
    }
}