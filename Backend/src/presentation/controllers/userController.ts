//user Controller
import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";


export class UserController{

     private userInteractor :IUserInteractor
     constructor(userInteractor:IUserInteractor){
        this.userInteractor = userInteractor
     }

     async userLogin(req:Request,res:Response,next:NextFunction){
        console.log("user login...");
        const { email, password } = req.body;
        try{
            const result = await this.userInteractor.login(email, password);

        }catch(error){

        }

     }
}