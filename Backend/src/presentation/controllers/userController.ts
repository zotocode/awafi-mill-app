//user Controller
import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";

// userController.ts

export class UserController {
   private userInteractor: IUserInteractor;
 
   constructor(userInteractor: IUserInteractor) {
     this.userInteractor = userInteractor;
   }
 
     //=-========================================controller login===============
   async userLogin(req: Request, res: Response, next: NextFunction) {
     try {
       const { email, password } = req.body;
       const result = await this.userInteractor.login(email,password);
       if (result.success) {
         return res.status(200).json({ message: result.message,data:result.data });
       } else {
         return res.status(401).json({ message: result.message });
       }
     } catch (error) {
       next(error); 
     }
   }
      //=-========================================register====================
   async userRegister(req: Request, res: Response, next: NextFunction) {
     try {
      const { email, password,phone,name } = req.body;
       const result = await this.userInteractor.registerUser(email,name,password,phone);
       if (result.success) {
         return res.status(200).json({ message: result.message,otp:result.otp });
       } else {
         return res.status(401).json({ message: result.message });
       }
     } catch (error) {
       next(error); 
     }
   }
 //=-========================================verify otp====================
   async otpVerify(req: Request, res: Response, next: NextFunction) {
      try {
       

        const result = await this.userInteractor.verifyOtp(req.body.otp);
    
        // Handle the response based on the result of OTP verification
        if (result.success) {
          return res.status(200).json({ message: result.message });
        } else {
          return res.status(400).json({ message: result.message });
        }
      } catch (err) {
        next(err)
      }
    }
    //  ==========================================Profile page section==================================
    async editProfile(req: Request, res: Response, next: NextFunction) {
      try {
       

        const result = await this.userInteractor.editProfile(req.body);
    
        // Handle the response based on the result of OTP verification
        if (result.success) {
          return res.status(200).json({ message: result.message });
        } else {
          return res.status(400).json({ message: result.message });
        }
      } catch (err) {
        next(err)
      }
    }

 }



 