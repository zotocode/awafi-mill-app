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
    console.log("admin login",req.body)
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
        const result = await this.adminInteractor.usersData()
        return res.status(200).json({status:true, data:result });  
    } catch (error) {
      next(error);
    }
  }
}
