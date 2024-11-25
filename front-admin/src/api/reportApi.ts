import { AxiosInstance } from "axios";
import { useApi } from "./axiosConfig";

// Define the sales data type
export type SalesData = {
  name: string; // E.g., Week, Month, Date
  sales: number; // The sales value for the period
};

// Define parameters for generating a sales report
export type GenerateSalesReportParams = {
  reportType: "weekly" | "monthly" | "yearly" | "custom"; // Report types
  startDate?: string; // Custom report start date (YYYY-MM-DD)
  endDate?: string; // Custom report end date (YYYY-MM-DD)
};

// Define the response structure for the sales report
export type GenerateSalesReportResponse = {
  salesData: SalesData[]; // Data for sales report
};

class SalesApi {
  private api: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  // Generate sales report based on the selected report type and date range
  async generateSalesReport(
    reportType: "weekly" | "monthly" | "yearly" | "custom",
    startDate?: string,
    endDate?: string
  ): Promise<GenerateSalesReportResponse> {
    try {
      const params: GenerateSalesReportParams = { reportType, startDate, endDate };
      
      // Call to the backend API for generating the sales report
      const response = await this.api.get<GenerateSalesReportResponse>("/api/salesReport", { params });
      
      console.log("Generated sales report data:", response.data);
      return response.data; // Returning the sales data
    } catch (error) {
      console.error("Failed to generate sales report:", error);
      throw error; // You can throw a custom error if needed
    }
  }

  // Example: Additional methods for sales-related operations can be added here, e.g., downloading reports.
  // async downloadSalesReport(format: 'excel' | 'pdf') { ... }
}

// Create an instance of SalesApi using the existing Axios configuration
const salesApiInstance = new SalesApi(useApi());

export default salesApiInstance;
