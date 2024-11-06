// src/presentation/controllers/userController.ts
//user Controller
import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { verify } from "crypto";
import { string } from "joi";

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
          .json({ status: true, message: result.message, otp: result.otp });
      } else {
        return res.status(401).json({ status: false, message: result.message });
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
        return res.status(200).json({ status: true, message: result.message });
      } else {
        return res.status(400).json({ status: false, message: result.message });
      }
    } catch (err) {
      next(err);
    }
  }
  //  ==========================================Profile page section==================================
  async editProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, phone } = req.body;
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      const result = await this.userInteractor.editProfile(
        id,
        email,
        name,
        phone
      );
      if (result.success) {
        return res
          .status(200)
          .json({ status: true, message: "user data update" });
      } else {
        return res.status(400).json({ status: false, message: result.message });
      }
    } catch (err) {
      next(err);
    }
  }
  //  ======================================== user profile=======================================
  async userProfile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("====================================");
      console.log(req.user);
      const id = req.user?.id;
      if (!id) {
        return res
          .status(400)
          .json({ status: false, message: "User ID not found in token" });
      }
      console.log("Decoded Payload ID:", id);
      // Use the id in profileData (ensured to be a string now)
      const profileData = await this.userInteractor.profileData(id);
      return res.status(200).json({ status: true, profileData });
    } catch (error) {
      next(error);
    }
  }
  //  ======================================== user profile=======================================
  async changePassword(req: Request, res: Response, next: NextFunction) {
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

  async addUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      const userAddress = await this.userInteractor.addUserAddress(
        id,
        req.body
      );
      if (userAddress.status) {
        return res
          .status(200)
          .json({ status: true, message: userAddress.message });
      } else {
        return res
          .status(400)
          .json({ status: false, message: userAddress.message });
      }
    } catch (error) {
      console.error("Error in addUserAddress controller:", error);
      next(error);
    }
  }

  async updateUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      const userEditAddress = await this.userInteractor.editUserAddress(
        id,
        req.body
      );
      if (userEditAddress.status) {
        return res
          .status(200)
          .json({ status: true, message: userEditAddress.message });
      } else {
        return res
          .status(400)
          .json({ status: false, message: userEditAddress.message });
      }
    } catch (error) {
      console.error("Error in addUserAddress controller:", error);
      next(error);
    }
  }

  async forgotUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "Email is required" });
      }
      const result = await this.userInteractor.forgotPassword(email);
      if (result.status) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error in forgotUserPassword controller:", error);
      next(error);
    }
  }

  async forgotOtpVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const result = await this.userInteractor.verifyFogotOtp(email, otp);
      if (result.status) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async forgotNewpasswordSet(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) {
        return res.status(400).json({ status: false, message: "All fields are required" });
      }
      const result = await this.userInteractor.updateNewPassword(email, otp, newPassword);
      if (result.status) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error in forgotNewpasswordSet controller:", error);
      return res.status(500).json({ status: false, message: "An internal server error occurred" });
    }
  }


  async getAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      const userEditAddress = await this.userInteractor.getUserAddress(id); 
      if (userEditAddress.status) {
        return res.status(200).json({
          status: true,
          message: userEditAddress.message,
          data: userEditAddress.data,
        });
      } else {
        return res.status(404).json({
          status: false,
          message: userEditAddress.message,
        });
      }
    } catch (error) {
      console.error("Error in getAddress controller:", error);
      return res.status(500).json({
        status: false,
        message: "An internal error occurred while fetching the address",
      });
    }
  }
  

}
