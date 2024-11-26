// src/interface/salesInterface/IadminSalesInteractor.ts

import { SalesSummary, ReportType } from '../../types/salesReport';

export interface IAdminSalesInteractor {
  generateSalesReport(
    reportType: ReportType, 
    startDate?: string, 
    endDate?: string    
  ): Promise<SalesSummary>;

  generateSalesReportExcel(
    reportType: ReportType, 
    startDate?: string, 
    endDate?: string
  ): Promise<Buffer>;
}