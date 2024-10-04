// src/application/interactor/userInteractor.ts
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IuserDocument } from "../../infrastructure/model/userModel";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IBcrypt } from "../../interface/serviceInterface/IbcryptInterface";
import { generateOTP } from "../services/otpService";
import { UserInteractorResp } from "../../types/userTypes";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import { userDTO,userCreationDTO } from "../../domain/dtos/UserDTO";  // Import UserDTO
import RedisServices from "../../application/services/redisServices";
 import {IEmailServices} from '../../application/services/emailService'
import { userProfileDTO,userPasswordChangeDTO } from "../../domain/dtos/UserDTO";



export class UserInteractor implements IUserInteractor {
  private userRepository: IUserRepo;
  private bcrypt: IBcrypt;
  private jwt: Ijwt;
  private emailService: IEmailServices;

  constructor(userRepository: IUserRepo, bcrypt: IBcrypt, jwt: Ijwt,emailService:IEmailServices) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.emailService=emailService;
  }

  //=-========================================login===============
  async login(email: string, password: string): Promise<UserInteractorResp> {
    try {
      const userData = await this.userRepository.findUserEmail(email);
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
      return { success: false, message: "User already  under registration process" };
    }
    
    
    // Generate OTP
    const otp = generateOTP();
    // Store user data along with OTP in Redis
    const userData = { email, name, password, phone, otp };
    await RedisServices.setData(email, userData, 300);  // Set data with a 5-minute expiration (300 seconds)
    // sendEmail--------------------
    await this.emailService.OtpEmail(email,otp)
    const dataSet={
      email,
      otp
    }
    return { success: true, data:dataSet, message: `User registcujuimration initiated, please verify OTP.${otp}` };
  } catch (error) {
   
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
        name: userData.name,    
        email: userData.email,  
        password: hashedPassword, 
        phone: userData.phone,  
        isVerified:true
      };
      await this.userRepository.registerUser(newUser);      // Clear user data from Redis after successful registration
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
// Edit Profile----------------------------------
async editProfile(id:string,email:string,name:string,phone:number): Promise<any> {
  try{
    const userData = await this.userRepository.findUser(id);
    console.log('====================================');
    console.log(userData,id,email,name,phone);
    console.log('====================================');
    if(!userData){
      return null
    }
    await this.userRepository.updateProfile(id,email,name,phone)
    return {success:true}
  }catch(error){
    
  } 
}

async profileData(id: string): Promise<userProfileDTO | null> {
  const user = await this.userRepository.findUser(id);
  if (!user) {
    return null; // Return null or throw an error if user is not found
  }
  return this.mapToUserProfileDTO(user);
}

private mapToUserProfileDTO(user: IuserDocument): userProfileDTO {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
  };
}

async changeUserPassword(id: string, password: string, newPassword: string): Promise <userPasswordChangeDTO | null|undefined> {
  const userData = await this.userRepository.findUser(id);
  if(!userData){
    return null
  }
  const userLogin = await this.bcrypt.comparePassword(password, userData.password);
  console.log('====================================');
  console.log("userLogin",userLogin);
  console.log('====================================');
  if(userLogin){
    const hashedPassword = await this.bcrypt.encryptPassword(newPassword);
    await this.userRepository.updatePassword(id, hashedPassword)
    return {status:true,message:"change password succesfully"}
  }
}

}
