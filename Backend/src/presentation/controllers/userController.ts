// src/presentation/controllers/userController.ts
//user Controller
import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
interface CustomRequest extends Request {
  user?: { id: string } | null; // Adjusting to include the user id
}
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
      const result = await this.userInteractor.login(email, password);
      if (result.success) {
        return res
          .status(200)
          .json({ status: true, message: result.message, token: result.data });
      } else {
        return res.status(401).json({ status: false, message: result.message });
      }
    } catch (error) {
      next(error);
    }
  }
  //=========================================register====================
  async userRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, phone, name } = req.body;
      const result = await this.userInteractor.registerUser(
        email,
        name,
        password,
        phone
      );
      if (result.success) {
        return res
          .status(200)
          .json({ status:true, message: result.message, otp: result.otp });
      } else {
        return res.status(401).json({status:false, message: result.message });
      }
    } catch (error) {
      next(error);
    }
  }
  //=-========================================verify otp====================
  async otpVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const result = await this.userInteractor.verifyOtp(email, otp);

      // Handle the response based on the result of OTP verification
      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (err) {
      next(err);
    }
  }
  //  ==========================================Profile page section==================================
  async editProfile(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {email,name,phone}= req.body
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      const result = await this.userInteractor.editProfile(id,email,name,phone);
      if (result.success) {
        return res.status(200).json({status:true, message: "user data update" });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (err) {
      next(err);
    }
  }
  //  ======================================== user profile=======================================
  async userProfile(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      console.log("====================================");
      console.log(req.user);
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      console.log("Decoded Payload ID:", id);
      // Use the id in profileData (ensured to be a string now)
      const profileData = await this.userInteractor.profileData(id);
      return res.status(200).json(profileData);
    } catch (error) {
      next(error);
    }
  }
  //  ======================================== user profile=======================================
  async changePassword(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { password, newPassword } = req.body;
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      const changePassword = await this.userInteractor.changeUserPassword(
        id,
        password,
        newPassword
      );
      if (!changePassword) {
        return res
          .status(401)
          .json({ status: false, message: "password missmatch" });
      }
      return res.status(200).json(changePassword);
    } catch (error) {
      next(error);
    }
  }
}
