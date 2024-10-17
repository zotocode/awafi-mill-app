// src/interface/userInterface/IuserInteractor.ts


export interface IBannerInteractor{
  addOfferBanner(path:string,startDate:string,endDate:string):Promise<any>
}
