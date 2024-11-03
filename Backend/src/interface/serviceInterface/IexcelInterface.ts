export interface IExcel{
    processExcel(filePath: any): Promise<any>;
    createExcelBuffer(data: any[]): Promise<Buffer>
    
}