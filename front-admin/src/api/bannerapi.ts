import { useApi } from './axiosConfig';

class BannerApi {
  axiosInstance: any = useApi();

  async addOfferBanner(formData: FormData): Promise<any> {
    try {
      const response = await this.axiosInstance.post('api/banner/offerBanner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data,"response.data");
      
      return response.data
    } catch (error) {
      console.error('Failed to add offer banner', error);
      throw error;
    }
  }

  // Other methods (addWelcomeBanner, addCollectionBanner) can follow the same pattern
  async fetchBanners():Promise<any>{
    try{
    const responce = await this.axiosInstance.get('api/banner/allBanners')
    return responce
    }catch(error){
      console.log(error)
      
    }
  }

  async unlistBanners(row:any):Promise<any>{
    try{
      const responce = await this.axiosInstance.post('api/banner/unlistBanner',row)
      return responce
      }catch(error){
        console.log(error)
        
      }
  }
}




export default new BannerApi();
