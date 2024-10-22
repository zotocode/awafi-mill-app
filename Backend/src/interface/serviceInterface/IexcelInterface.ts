export interface IExcel{
    processExcel(filePath: any): Promise<any>
}