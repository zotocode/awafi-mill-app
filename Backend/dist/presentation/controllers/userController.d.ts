import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
export declare class UserController {
    private userInteractor;
    constructor(userInteractor: IUserInteractor);
    userLogin(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    userRegister(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    otpVerify(req: Request, res: Response, next: NextFunction): Promise<void>;
}
