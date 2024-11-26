// src/infrastructure/repositories/adminSalesRepo.ts

import { ISalesRepository } from '../../interface/salesInterface/IsalesRepo';
import { SalesSummary, ReportType, SalesReportItem } from '../../types/salesReport'; 
import { CheckoutModel } from '../model/checkoutModel';
import { ProductModel } from '../model/producModel'; 
import ExcelJS from 'exceljs';
import moment from 'moment';
import { LOGO_BASE64 } from '../../utils/constants'; 

export class AdminSalesRepository implements ISalesRepository {
  private getDateRangeFilter(reportType: ReportType, startDate?: Date, endDate?: Date) {
    const now = new Date();
    let start: Date, end: Date;

    switch (reportType) {
      case 'weekly':
        start = moment(now).subtract(7, 'days').toDate();
        end = now;
        break;
      case 'monthly':
        start = moment(now).subtract(1, 'months').toDate();
        end = now;
        break;
      case 'yearly':
        start = moment(now).subtract(1, 'years').toDate();
        end = now;
        break;
      case 'custom':
        if (!startDate || !endDate) {
          throw new Error('Start and end dates are required for custom report');
        }
        start = startDate;
        end = endDate;
        break;
    }

    return { start, end };
  }

  async generateSalesReport(
    reportType: ReportType, 
    startDate?: Date, 
    endDate?: Date
  ): Promise<SalesSummary> {
    const { start, end } = this.getDateRangeFilter(reportType, startDate, endDate);

    const salesData = await CheckoutModel.aggregate([
      {
        $match: {
          orderPlacedAt: { 
            $gte: start, 
            $lte: end 
          },
          paymentStatus: 'completed'
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.productId',
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
          totalQuantity: { $sum: '$items.quantity' },
          productName: { $first: '$items.name' },
          variantWeight: { $first: '$items.weight' }
        }
      },
      {
        $project: {
          productId: '$_id',
          productName: 1,
          variantWeight: 1,
          totalRevenue: 1,
          totalQuantity: 1,
          averagePrice: { $divide: ['$totalRevenue', '$totalQuantity'] }
        }
      },
      {
        $sort: { totalRevenue: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const totalRevenueResult = await CheckoutModel.aggregate([
      {
        $match: {
          orderPlacedAt: { 
            $gte: start, 
            $lte: end 
          },
          paymentStatus: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;
    const totalOrders = totalRevenueResult[0]?.totalOrders || 0;

    return {
      totalRevenue,
      totalQuantitySold: salesData.reduce((sum, item) => sum + item.totalQuantity, 0),
      averageOrderValue: totalRevenue / (totalOrders || 1),
      topSellingProducts: salesData.map(item => ({
        productId: item.productId,
        productName: item.productName,
        variantWeight: item.variantWeight,
        quantity: item.totalQuantity,
        totalRevenue: item.totalRevenue,
        averagePrice: item.averagePrice
      })),
      reportPeriod: {
        startDate: start,
        endDate: end
      }
    };
  }

  async exportSalesReportToExcel(
    reportType: ReportType, 
    startDate?: Date, 
    endDate?: Date
  ): Promise<Buffer> {
    const salesReport = await this.generateSalesReport(reportType, startDate, endDate);
    
    // Use the new Excel generator
    return SalesReportExcelGenerator.create(salesReport);
  }
}



export class SalesReportExcelGenerator {
  private workbook: ExcelJS.Workbook;
  private worksheet: ExcelJS.Worksheet;

  constructor(private salesData: SalesSummary) {
    this.workbook = new ExcelJS.Workbook();
    this.worksheet = this.workbook.addWorksheet('Sales Report', {
      pageSetup: { 
        paperSize: 9, 
        orientation: 'landscape' 
      }
    });
  }

  private addCompanyLogo() {
    const image = this.workbook.addImage({
      base64: LOGO_BASE64,
      extension: 'png',
    });
  
    this.worksheet.getCell('A1').value = '';  // Clear any previous content in A1 if necessary
    this.worksheet.addImage(image, {
      tl: { col: 0, row: 0 },  // Place in column A, row 1
      ext: { width: 140, height: 140 }  // Adjust size as needed
    });
  
    // Add company name next to the logo in cell B1
    const companyNameCell = this.worksheet.getCell('B1');
    companyNameCell.value = 'Awafi Mill';
    companyNameCell.font = { 
      name: 'Arial', 
      size: 14, 
      bold: true, 
      color: { argb: '000000' }
    };
    companyNameCell.alignment = { 
      vertical: 'middle', 
      horizontal: 'left' 
    };
  
    this.worksheet.getColumn(2).width = 30; 
  
    const rowHeightPixels = 100 + 10; 
    const rowHeightPoints = rowHeightPixels * 72 / 96; // Assuming 96 DPI
    this.worksheet.getRow(1).height = rowHeightPoints;
  }
  
  

private getTextHeight(cellAddress: string): number {
    const cell = this.worksheet.getCell(cellAddress);
    const fontSize = cell.font?.size || 12;  // default to 12 if not set
    return fontSize * 1.2; // Adjust this multiplier for more accuracy. 
}
  
  
  private addReportHeader() {
    // Merge and style the report title row
    this.worksheet.mergeCells('A2:F2');
    const titleRow = this.worksheet.getRow(2);
    titleRow.getCell(1).value = 'Sales Performance Report';
    titleRow.getCell(1).font = {
      name: 'Arial',
      size: 16,
      bold: true,
      color: { argb: '000000' }
    };
    titleRow.getCell(1).alignment = { 
      horizontal: 'center', 
      vertical: 'middle' 
    };
  }

  private addReportSummary() {
    const summaryStartRow = 4;
    const summaryData = [
      ['Report Period', `${this.salesData.reportPeriod.startDate.toLocaleDateString()} - ${this.salesData.reportPeriod.endDate.toLocaleDateString()}`],
      ['Total Revenue', `$${this.salesData.totalRevenue.toFixed(2)}`],
      ['Total Quantity Sold', this.salesData.totalQuantitySold],
      ['Average Order Value', `$${this.salesData.averageOrderValue.toFixed(2)}`]
    ];

    summaryData.forEach((item, index) => {
      const row = this.worksheet.getRow(summaryStartRow + index);
      row.getCell(1).value = item[0];
      row.getCell(1).font = { bold: true };
      row.getCell(2).value = item[1];
    });
  }

  private addTopSellingProductsHeader() {
    const headerRow = this.worksheet.getRow(9);
    const headers = [
      'Product Name', 
      'Variant Weight', 
      'Quantity Sold', 
      'Total Revenue', 
      'Average Price'
    ];

    headers.forEach((header, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = header;
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F0F0F0' }
      };
      cell.alignment = { horizontal: 'center' };
    });
  }

  private addTopSellingProducts() {
    const startRow = 10;
    this.salesData.topSellingProducts.forEach((product, index) => {
      const row = this.worksheet.getRow(startRow + index);
      row.getCell(1).value = product.productName;
      row.getCell(2).value = product.variantWeight;
      row.getCell(3).value = product.quantity;
      row.getCell(4).value = `$${product.totalRevenue.toFixed(2)}`;
      row.getCell(5).value = `$${product.averagePrice.toFixed(2)}`;

      // Alternate row colors for readability
      if (index % 2 === 0) {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'F5F5F5' }
          };
        });
      }
    });
  }

  private styleWorksheet() {
    // Set column widths
    this.worksheet.columns = [
      { width: 30 },  // Product Name
      { width: 15 },  // Variant Weight
      { width: 15 },  // Quantity Sold
      { width: 15 },  // Total Revenue
      { width: 15 }   // Average Price
    ];

    // Add borders
    this.worksheet.eachRow((row, rowNumber) => {
      if (rowNumber >= 9) {  // Start from the header row
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.alignment = { 
            vertical: 'middle', 
            horizontal: 'left',
            wrapText: true 
          };
        });
      }
    });
  }

  public async generateExcel(): Promise<Buffer> {
    // Compose the Excel report
    this.addCompanyLogo();
    this.addReportHeader();
    this.addReportSummary();
    this.addTopSellingProductsHeader();
    this.addTopSellingProducts();
    this.styleWorksheet();

    // Generate and return the Excel buffer
    return await this.workbook.xlsx.writeBuffer() as Buffer;
  }

  // Static method to create and generate Excel in one step
  static async create(salesData: SalesSummary): Promise<Buffer> {
    const generator = new SalesReportExcelGenerator(salesData);
    return generator.generateExcel();
  }
}