// src/interface/userInterface/IuserInteractor.ts


export interface IBannerInteractor{
  addOfferBanner(path:string,startDate:string,endDate:string,name:string,type:string):Promise<any>
  allBanners():Promise<any>
  toggleBannerListedStatus(imageUrl:string,name:string):Promise<any>
  viewWelcomeBanner():Promise<any>
  viewOfferBanner():Promise<any>
  viewCollectionBanner():Promise<any>
}
