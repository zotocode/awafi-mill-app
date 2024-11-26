import { Types } from 'mongoose';

export interface SalesReportItem {
  productId: Types.ObjectId;
  productName: string;
  variantWeight: string;
  quantity: number;
  totalRevenue: number;
  averagePrice: number;
}

export interface SalesSummary {
  totalRevenue: number;
  totalQuantitySold: number;
  averageOrderValue: number;
  topSellingProducts: SalesReportItem[];
  reportPeriod: {
    startDate: Date;
    endDate: Date;
  };
}

export type ReportType = 'weekly' | 'monthly' | 'yearly' | 'custom';