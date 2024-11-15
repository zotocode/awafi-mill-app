import { useApi } from './axiosConfig';

class SalesApi {
  axiosInstance = useApi();

  async generateSalesReport(reportType:string, startDate:string, endDate:string) {
    try {
      const response = await this.axiosInstance.get('/api/admin/sales-report', {
        params: {
          reportType,
          startDate: startDate || null,
          endDate: endDate || null,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch sales report:', error);
      throw error;
    }
  }
}

export default new SalesApi();
