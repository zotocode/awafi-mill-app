// src/interface/salesInterface/IsalesRepo.ts

import { SalesSummary, ReportType } from '../../types/salesReport';

export interface ISalesRepository {
  generateSalesReport(
    reportType: ReportType, 
    startDate?: Date, 
    endDate?: Date
  ): Promise<SalesSummary>;

  exportSalesReportToExcel(
    reportType: ReportType, 
    startDate?: Date, 
    endDate?: Date
  ): Promise<Buffer>;
}