// src/application/interactor/adminSalesInteractor.ts

import { IAdminSalesInteractor } from '../../interface/salesInterface/IadminSalesInteractor';
import { ISalesRepository } from '../../interface/salesInterface/IsalesRepo'; 
import { SalesSummary, ReportType } from '../../types/salesReport';

export class AdminSalesInteractor implements IAdminSalesInteractor {
  private salesRepository: ISalesRepository;

  constructor(salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository;
  }

  async generateSalesReport(
    reportType: ReportType, 
    startDate?: string, 
    endDate?: string
  ): Promise<SalesSummary> {
    // Validate input
    this.validateDateInput(reportType, startDate, endDate);

    // Convert string dates to Date objects
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return this.salesRepository.generateSalesReport(reportType, start, end);
  }

  async generateSalesReportExcel(
    reportType: ReportType, 
    startDate?: string, 
    endDate?: string
  ): Promise<Buffer> {
    // Validate input
    this.validateDateInput(reportType, startDate, endDate);

    // Convert string dates to Date objects
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return this.salesRepository.exportSalesReportToExcel(reportType, start, end);
  }

  private validateDateInput(
    reportType: ReportType, 
    startDate?: string, 
    endDate?: string
  ) {
    if (reportType === 'custom') {
      if (!startDate || !endDate) {
        throw new Error('Start and end dates are required for custom report');
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
      }

      if (start > end) {
        throw new Error('Start date must be before end date');
      }
    }
  }
}