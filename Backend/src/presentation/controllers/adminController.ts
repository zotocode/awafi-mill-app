import { Request, Response, NextFunction } from "express";
import { IadminInteractor } from "../../interface/adminInterface/IadminInteractor";

export class AdminController {
    private adminInteractor : IadminInteractor
  constructor(
  adminInteractor:IadminInteractor
  ) {
    this.adminInteractor = adminInteractor
  }

  async adminLogin(req: Request, res: Response, next: NextFunction) {
    const result = await this.adminInteractor.logIn(req.body)
    if (result.success) {
        return res
          .status(200)
          .json({ status: true, message: result.message, token: result.data });
      } else {
        return res.status(401).json({ status: false, message: result.message });
      }
  
  }

  async allUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adminInteractor.usersData();
      return res.status(result.status ? 200 : 500).json(result);  
    } catch (error) {
      next(error);
    }
  }

  async blockUser(req: Request, res: Response, next: NextFunction){
    const result = await this.adminInteractor.blockUser(req.body.email)
    if (result.success) {
      return res
        .status(200)
        .json({ status: true, message:'User successfully blocked'});
    } else {
      return res.status(401).json({ status: false, message: result.message });
    }
  }

  async unblockUser(req: Request, res: Response, next: NextFunction){
    const result = await this.adminInteractor.unblockUser(req.body.email)
    if (result.success) {
      return res
        .status(200)
        .json({ status: true, message:'User successfully unblocked'});
    } else {
      return res.status(401).json({ status: false, message: result.message });
    }
  }


  async dashTotalOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adminInteractor.totalOrders()
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
        const result = await this.adminInteractor.totalRevenue(period);
        return res.json(result); 
    } catch (error) {
        console.log(error); 
        next(error); 
    }
}
  
}
