//user Controller
import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
// userController.ts

export class UserController {
   private userInteractor: IUserInteractor;
 
   constructor(userInteractor: IUserInteractor) {
     this.userInteractor = userInteractor;
   }
 
   async userLogin(req: Request, res: Response, next: NextFunction) {
     const { email, password } = req.body;
     try {
       const result = await this.userInteractor.login(email, password);
       if (result.success) {
         return res.status(200).json({ message: result.message });
       } else {
         return res.status(401).json({ message: result.message });
       }
     } catch (error) {
       next(error); // Passing error to global error handler (500)
     }
   }
 
   async userRegister(req: Request, res: Response, next: NextFunction) {
     try {
       const result = await this.userInteractor.registerUser(req.body);
       if (result.success) {
         return res.status(200).json({ message: result.message,otp:result.otp });
       } else {
         return res.status(401).json({ message: result.message });
       }
     } catch (error) {
       next(error); // Passing error to global error handler (500)
     }
   }

   async otpVerify(req: Request, res: Response, next: NextFunction){
      try{
         console.log('====================================');
         console.log("reached controller");
         console.log('====================================');
         const result = await this.userInteractor.verifyOtp(req.body);

      }catch(err){
         console.log(err);
         
      }
   }
 }
 