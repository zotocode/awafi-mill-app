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
      return response.data.imageUrl; // Assuming the API response returns an image URL
    } catch (error) {
      console.error('Failed to add offer banner', error);
      throw error;
    }
  }

  // Other methods (addWelcomeBanner, addCollectionBanner) can follow the same pattern
}

export default new BannerApi();
