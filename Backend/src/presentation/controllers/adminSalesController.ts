// src/presentation/controllers/adminSalesController.ts
import { Request, Response } from 'express';
import { IAdminSalesInteractor } from '../../interface/salesInterface/IadminSalesInteractor';
import { ReportType } from '../../types/salesReport'; 

export class AdminSalesController {
  private salesInteractor: IAdminSalesInteractor;

  constructor(salesInteractor: IAdminSalesInteractor) {
    this.salesInteractor = salesInteractor;
  }

  async getSalesReport(req: Request, res: Response) {
    try {
      const { 
        reportType, 
        startDate, 
        endDate 
      } = req.query as { 
        reportType: ReportType, 
        startDate?: string, 
        endDate?: string 
      };
    //   await new Promise((resolve) => setTimeout(resolve, 5000));
      const salesReport = await this.salesInteractor.generateSalesReport(
        reportType, 
        startDate, 
        endDate
      );

      res.json(salesReport);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async downloadSalesReport(req: Request, res: Response) {
    try {
      const { 
        reportType, 
        startDate, 
        endDate 
      } = req.query as { 
        reportType: ReportType, 
        startDate?: string, 
        endDate?: string 
      };
    //   await new Promise((resolve) => setTimeout(resolve, 5000));

      const excelBuffer = await this.salesInteractor.generateSalesReportExcel(
        reportType, 
        startDate, 
        endDate
      );

      res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=sales_report_${reportType}.xlsx`);
      res.send(excelBuffer);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any) {
    console.error('Sales Report Error:', error);
    res.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
}