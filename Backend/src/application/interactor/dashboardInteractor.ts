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
    try {
      const result = await this.chekoutRepository.viewAllOrders();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async totalRevenue(period?: string): Promise<any> {
    try {
      const result = await this.chekoutRepository.viewRevenue(period as 'day' | 'month' | 'year');

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async salesReport(
    reportType?: 'day' | 'week' | 'month' | 'year',
    startDate?: Date,
    endDate?: Date
  ): Promise<any> {
    try {
      if (!reportType || !startDate || !endDate) {
        throw new Error("Missing required parameters for generating sales report.");
      }

      const result = await this.chekoutRepository.generateProductSalesReport(
        startDate,
        endDate,
        reportType
      );
      return result;
    } catch (error) {
      console.error('Error generating sales report:', error);
      throw error;
    }
  }
}

export default DashboardInteractor;
