import xlsx from 'xlsx';
import { IExcel } from '../../interface/serviceInterface/IexcelInterface';

export class ExcelService implements IExcel {

  // Method to process Excel file (unchanged)
  public async processExcel(filePath: string): Promise<any> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return sheetData;
  }
   
  // Helper function to flatten data
  private flattenData(data: any[]): any[] {
  
    return data.map(item => {
      const flattened = { ...item };

      // Flatten `variants` object
      if (item.variants) {
        Object.keys(item.variants).forEach(key => {
          flattened[`variant_${key}`] = item.variants[key];
        });
        delete flattened.variants;
      }

      // Convert `images` array to comma-separated string
      if (Array.isArray(item.images)) {
        flattened.images = item.images.join(', ');
      }

      return flattened;
    });
  }

  // Method to create Excel buffer with flattened data
  public async createExcelBuffer(data: any[]): Promise<Buffer> {
    const flattenedData = this.flattenData(data);
    
    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(flattenedData);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a buffer
    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return buffer;
  }
}
