import { NextFunction, Request, Response } from "express";
import { IDashboardInteractor } from "../../interface/dashboardInterface/IdashboardInteractor";

class DashboardController{
    private dashboardInteractor:IDashboardInteractor
    constructor(dashboardInteractor:IDashboardInteractor){
    this.dashboardInteractor=dashboardInteractor
    }
    async dashTotalOrders(req: Request, res: Response, next: NextFunction) {
        try {
          const result = await this.dashboardInteractor.totalOrders()
          return res.status(200).json({ status: true, data: result });
        } catch (error) {
          console.error('Error in dashTotalOrders:', error);
          return res.status(500).json({ status: false, message: 'Internal server error' });
        }
      }
    
      async dashTotalRevenue(req: Request, res: Response, next: NextFunction) {
        try {
            let period: string | undefined;
            if (typeof req.query.period === 'string') {
                period = req.query.period;
            } else {
                period = undefined; 
            }     
            const result = await this.dashboardInteractor.totalRevenue(period as 'day' | 'month' | 'year');
            return res.json(result); 
        } catch (error) {
            console.log(error); 
            next(error); 
        }
    }
    async salesReport(req: Request, res: Response, next: NextFunction) {
        try {
          type ReportType = "day" | "week" | "month" | "year";
          
          const reportType = req.query.reportType as ReportType;
          const startDate = new Date(req.query.startDate as string);
          const endDate = new Date(req.query.endDate as string);
      
          // Validate the parsed dates
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error("Invalid date format for startDate or endDate.");
          }
      
          const result = await this.dashboardInteractor.salesReport(reportType, startDate, endDate);
          res.status(200).json({ success: true, data: result });
        } catch (error) {
          console.error("Error in salesReport:", error);
          next(error); // Forward the error to error-handling middleware
        }
      }
      
}

export default DashboardController