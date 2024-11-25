import { RevenueSummary,OrderSummary } from "../../domain/dtos/CheckoutDTO";

export interface IDashboardInteractor {
    totalOrders(): Promise<OrderSummary[]>;
    topSellings(): Promise<any>;
    totalRevenue(period?: 'day' | 'month' | 'year'): Promise<any>;
    salesReport(reportType:'day' | 'week' | 'month' | 'year',startDate:Date,endDate:Date):Promise<any>
}
