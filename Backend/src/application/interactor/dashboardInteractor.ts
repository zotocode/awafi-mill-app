import { RevenueSummary, OrderSummary } from "../../domain/dtos/CheckoutDTO";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import { IDashboardInteractor } from "../../interface/dashboardInterface/IdashboardInteractor";
import IDashboardRepository from "../../interface/dashboardInterface/IDashboardRepo";


class DashboardInteractor implements IDashboardInteractor {
  private chekoutRepository: IDashboardRepository;

  constructor(chekoutRepository: IDashboardRepository) {
    this.chekoutRepository = chekoutRepository;
  }

  async totalOrders(): Promise<OrderSummary[]> {

      const result = await this.chekoutRepository.viewAllOrders();
      return result;

  
  }
  async topSellings(): Promise<any> {

   
      const products = await this.chekoutRepository.topSellingProduct();

      return {products};
  
  }

  async totalRevenue(period?: string): Promise<any> {
  
      const result = await this.chekoutRepository.viewRevenue(period as 'day' | 'month' | 'year');

      return result;

  }

  async salesReport(
    reportType?: 'day' | 'week' | 'month' | 'year',
    startDate?: Date,
    endDate?: Date
  ): Promise<any> {

      if (!reportType || !startDate || !endDate) {
        throw new Error("Missing required parameters for generating sales report.");
      }

      const result = await this.chekoutRepository.generateProductSalesReport(
        startDate,
        endDate,
        reportType
      );
      return result;
  
  }
}

export default DashboardInteractor;
