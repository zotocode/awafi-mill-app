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
}
