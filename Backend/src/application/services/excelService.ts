import xlsx from 'xlsx';
import { IExcel } from '../../interface/serviceInterface/IexcelInterface';
import {Variant,Description,ProdutFormData} from '../../types/productTypes'

export class ExcelService implements IExcel {

  public async processExcel(filePath: string): Promise<any> {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return sheetData;
  }

  public async createExcelBuffer(data: any[]): Promise<Buffer> {
    // Transform the data to handle nested structures
    const formattedData = this.formatDataForExcel(data);

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(formattedData);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Write the workbook to a buffer
    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return buffer;
  }

  private formatDataForExcel(data: any[]): any[] {
    const formattedData:ProdutFormData[] = [];

    data.forEach(product => {
      const { _id, sku, ean, name, isListed, images, createdAt, updatedAt } = product;

      // Handle variants and descriptions by creating individual rows for each combination
      (product.variants || []).forEach((variant:Variant) => {
          formattedData.push({
            _id,
            sku,
            ean,
            name,
            isListed,
            images: images.join(', '), // Convert array to a comma-separated string for easier Excel display
            createdAt,
            updatedAt,
            variantWeight: variant.weight,
            variantInPrice: variant.inPrice,
            variantOutPrice: variant.outPrice,
            variantStockQuantity: variant.stockQuantity,
        
        });
      });
    });

    return formattedData;
  }
}
