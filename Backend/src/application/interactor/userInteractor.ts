// src/application/interactor/userInteractor.ts
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IBcrypt } from "../../interface/serviceInterface/IbcryptInterface";
import { generateOTP } from "../services/otpService";
import { UserInteractorResp } from "../../types/userTypes/userInteractorTypes";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import { userDTO,userCreationDTO } from "../../domain/dtos/UserDTO";  // Import UserDTO
import RedisServices from "../../application/services/redisServices";

export class UserInteractor implements IUserInteractor {
  private userRepository: IUserRepo;
  private bcrypt: IBcrypt;
  private jwt: Ijwt;

  constructor(userRepository: IUserRepo, bcrypt: IBcrypt, jwt: Ijwt) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  //=-========================================login===============
  async login(email: string, password: string): Promise<UserInteractorResp> {
    try {
      const userData = await this.userRepository.findUser(email);
      if (!userData) {
        return { success: false, message: "User not found" };
      }

      const userLogin = await this.bcrypt.comparePassword(password, userData.password);
      if (userLogin) {
        const accessToken = this.jwt.generateToken({ id: userData.id }, "1h");
        return { success: true, message: "Login successful", data: accessToken };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.log("error", error);
      throw new Error("Login failed");
    }
  }

  //=-========================================registration========================
  async registerUser(email: string, name: string, password: string, phone: number): Promise<UserInteractorResp> {
  try {
 
    const existingUser = await RedisServices.getData<{ email: string; name: string; password: string; phone: number; otp: string }>(email);
    if (existingUser) {
      return { success: false, message: "User already registered" };
    }

    // Generate OTP
    const otp = generateOTP();

    // Store user data along with OTP in Redis
    const userData = { email, name, password, phone, otp };
    await RedisServices.setData(email, userData, 300);  // Set data with a 5-minute expiration (300 seconds)

    console.log("User data saved in Redis");

    return { success: true, otp, message: "User registration initiated, please verify OTP." };
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Registration failed");
  }
}

//=-========================================verifyOtp========================
async verifyOtp(email: string, otp: string): Promise<any> {
  try {
    // Retrieve user data from Redis
    const userData = await RedisServices.getData<{ email: string; name: string; password: string; phone: number; otp: string }>(email);

    if (!userData) {
      return { success: false, message: "User data not found or expired" };
    }
   

    // Validate the OTP
    if (userData.otp === otp) {
      const hashedPassword = await this.bcrypt.encryptPassword(userData.password);
  
      const newUser: userCreationDTO = {
        name: userData.name,    // Name from Redis
        email: userData.email,  // Email from Redis or passed from the request
        password: hashedPassword, // Hashed password from Redis
        phone: userData.phone,  // Phone from Redis
        isVerified:true
      };
      
      // Convert DTO to entity and register the user
  
      await this.userRepository.registerUser(newUser);

      // Clear user data from Redis after successful registration
      await RedisServices.deleteData(email);

      return { success: true, message: "User registered successfully." };
    } else {
      return { success: false, message: "Invalid OTP." };
    }
  } catch (error) {
    console.log(error);
    throw new Error("OTP verification failed.");
  }
}

async editProfile(data: any): Promise<any> {
     console.log('dem')
}

}

