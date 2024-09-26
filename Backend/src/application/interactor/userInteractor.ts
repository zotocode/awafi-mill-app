

// userInteractor.ts
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { User } from "../../domain/userSchema";
import { IBcrypt } from "../../interface/serviceInterface/bcryptInterface";
import { generateOTP } from "../services/otpService";
import { UserInteractorResp } from "../../types/userTypes/userInteractorTypes";
import { Ijwt } from "../../interface/serviceInterface/jwtInterface";
import RedisServices from "../../application/services/redisServices"




// userInteractor.ts

export class UserInteractor implements IUserInteractor {
  private userRepository: IUserRepo;
  private bcrypt: IBcrypt;
  private jwt:Ijwt;

  constructor(userRepository: IUserRepo, bcrypt: IBcrypt,jwt:Ijwt) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  //=-========================================login===============
  async login(email:string,password:string): Promise<UserInteractorResp> {
    try {
      const userData = await this.userRepository.findUser(email);
      if (!userData) {
        return { success: false, message: "User not found" };
      }
      const userLogin = await this.bcrypt.comparePassword(
        password,
        userData.password
      );
      if (userLogin) {
        const accessToken = this.jwt.generateToken({ id: userData.id }, "1h");
        return { success: true, message: "Login successful", data:accessToken};
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.log("error", error);
      throw new Error("Login failed");
    }
  }

  //=-========================================registration========================
  async  registerUser(email: string, name: string, password: string, phone: number): Promise<UserInteractorResp> {
    try {
  
      // Check if user exists in Redis
      const userData = await RedisServices.getUserData(email);
      if (userData) {
        return { success: false, message: "User already registered" };
      }

      console.log("hi second")
  
      // Generate OTP
      const otp = generateOTP();
  
      // Store user data in Redis
      await RedisServices.storeUserData(email, name, password, phone, otp);
        console.log("data saved on redis")
      // Return OTP
      return { success: true, otp, message: "User registration initiated.." };
    } catch (error) {
      console.error("Error during registration:", error);
      throw new Error("Registration failed");
    }
  }

  //=-========================================otpverify========================

  async verifyOtp(otp:string): Promise<UserInteractorResp> {
    try {
     
   
        return { success: false, message: "Invalid OTP." };
  
    } catch (error) {
      console.log(error);
      throw new Error("OTP verification failed.");
    }
  }

  // =======================================profile section starting from here======================================
  
  async editProfile(otp:string): Promise<void> {
    try {

     
    } catch (error) {
      console.log(error);
      throw new Error("OTP verification failed.");
    }
  }

}
