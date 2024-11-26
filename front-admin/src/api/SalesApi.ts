import { AxiosInstance } from "axios";
import { useApi } from "./axiosConfig"; // Assuming you have an Axios instance setup

// Define the parameters for generating sales report
export type SalesReportParams = {
  reportType: string;
  startDate: string;
  endDate: string;
};

// Define the response type for sales summary
export type SalesSummary = {
  reportPeriod: {
    startDate: string;
    endDate: string;
  };
  totalRevenue: number;
  totalQuantitySold: number;
  averageOrderValue: number;
  topSellingProducts: Array<{
    productId: string;
    productName: string;
    quantity: number;
    totalRevenue: number;
    averagePrice: number;
  }>;
};

// Define the response type for downloading the report (blob data)
export type DownloadReportResponse = Blob;

class SalesReportApi {
  private api: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  // Fetch the sales report
  async generateSalesReport(params: SalesReportParams): Promise<SalesSummary> {
    try {
      const response = await this.api.get<SalesSummary>("/api/sales/report", { params });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sales report:", error);
      throw error;
    }
  }

  // Download the sales report as a Blob (Excel file)
  async downloadSalesReport(params: SalesReportParams): Promise<DownloadReportResponse> {
    try {
      const response = await this.api.get<DownloadReportResponse>("/api/sales/report/download", {
        responseType: "blob",
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to download sales report:", error);
      throw error;
    }
  }
}

// Create an instance of SalesReportApi using the existing Axios configuration
const salesReportApiInstance = new SalesReportApi(useApi());

export default salesReportApiInstance;
