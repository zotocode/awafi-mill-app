import { useApi } from './axiosConfig';

class DashboardApi {
  axiosInstance: any = useApi();

  async fetchTotalViews(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('api/dashboard/orders');
      console.log(response.data);
      
      return response.data; // Ensure your backend sends { total, rate }
    } catch (error) {
      console.error('Failed to fetch total views', error);
      throw error;
    }
  }
  async topSellings(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('api/dashboard/top-Selling');
      return response.data; // Ensure your backend sends { total, rate }
    } catch (error) {
      console.error('Failed to fetch total views', error);
      throw error;
    }
  }

  async fetchTotalRevenue(period:'month' | 'year' |'day'): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`api/dashboard/revenue?period=${period}`);
      return response.data; 
    } catch (error) {
      console.error('Failed to fetch total profit', error);
      throw error;
    }
  }

  async fetchTotalProducts(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('api/admin/dashboard-total-products');
      return response.data; // Ensure your backend sends { total, rate }
    } catch (error) {
      console.error('Failed to fetch total products', error);
      throw error;
    }
  }

  // You can add more methods here as needed
}

export default new DashboardApi();
