// ExcelService.ts
import xlsx from 'xlsx';
import { IExcel } from '../../interface/serviceInterface/IexcelInterface';

export class ExcelService implements IExcel{



  public async processExcel(filePath: string): Promise<any> {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return sheetData
  }

  public async createExcelBuffer(data: any[]): Promise<Buffer> {
    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return buffer;
  }
}
