export interface IExcel{
<<<<<<< HEAD
    processExcel(filePath: any): Promise<any>
=======
    processExcel(filePath: any): Promise<any>;
    createExcelBuffer(data: any[]): Promise<Buffer>
>>>>>>> upstream/develop
}