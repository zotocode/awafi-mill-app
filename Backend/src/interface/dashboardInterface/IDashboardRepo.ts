import { RevenueSummary } from "../../domain/dtos/CheckoutDTO";
import { OrderSummary } from "../../domain/dtos/CheckoutDTO";

export interface IDashboardRepository {
  viewAllOrders(): Promise<OrderSummary[]>;
  viewRevenue(period?: 'day' | 'month' | 'year'): Promise<any>;
  generateProductSalesReport(
    startDate: Date,
    endDate: Date,
    interval: "day" | "week" | "month" | "year"
  ): Promise<any>;
}

export default IDashboardRepository;
