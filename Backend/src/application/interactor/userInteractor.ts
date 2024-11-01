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
import { IaddressRepo } from "../../interface/addressInterface/IaddressRepo";


export class UserInteractor implements IUserInteractor {
  private userRepository: IUserRepo;
  private bcrypt: IBcrypt;
  private jwt: Ijwt;
  private emailService: IEmailServices;
  private addressRepo : IaddressRepo;

  constructor(userRepository: IUserRepo, bcrypt: IBcrypt, jwt: Ijwt,emailService:IEmailServices,addressRepo : IaddressRepo ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.emailService=emailService;
    this.addressRepo = addressRepo;
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
        const accessToken = this.jwt.generateToken({ id: userData.id }, "1d");
        return { success: true, message: "Login successful", data: accessToken };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {

      throw new Error("Login failed");
    }
  }

  //=-========================================registration========================
  async registerUser(email: string, name: string, password: string, phone: number): Promise<UserInteractorResp> {
  try {
   
    await RedisServices.deleteData(email);
    const existingUser = await RedisServices.getData<{ email: string; name: string; password: string; phone: number; otp: string }>(email);
    if (existingUser) {
     
      return { success: false, message: "User already  under registration process" };
    }
    
    const registeredUser = await this.userRepository.findUserEmail(email)
    if(registeredUser){
      return { success: false, message: "User already present" };
    }
    
    // Generate OTP
    const otp = generateOTP();
    // Store user data along with OTP in Redis
    const userData = { email, name, password, phone, otp };
    await RedisServices.setData(email, userData, 300);  // Set data with a 5-minute expiration (300 seconds)
    // sendEmail--------------------
    await this.emailService.OtpEmail(email,otp)
    const dataSet={
      email
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
      await this.userRepository.registerUser(newUser);      
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


//-------------------- Edit Profile----------------------------------
async editProfile(id:string,email:string,name:string,phone:number): Promise<any> {
  try{
    const userData = await this.userRepository.findUser(id);
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
    return null; 
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
  if(userLogin){
    const hashedPassword = await this.bcrypt.encryptPassword(newPassword);
    await this.userRepository.updatePassword(id, hashedPassword)
    return {status:true,message:"change password succesfully"}
  }
}

async addUserAddress(id: string, address: any): Promise<any> {
  try {
    const result = await this.addressRepo.addAddress(id, address);

    if (!result.status) {
      return { status: false, message: result.message };
    }

    return { status: true, message: "User address added successfully" };
  } catch (error) {
    console.error("Error in addUserAddress:", error);
    return { status: false, message: "An error occurred while adding the user address" };
  }
}

 async editUserAddress(id: string, newAddress: any): Promise<any> {
   try{
    const result = await this.addressRepo.editAddress(id,newAddress)
    if (!result.status) {
      return { status: false, message: result.message };
    }
    return { status: true, message: "User address added successfully" };
   }catch(error){
    console.error("Error in addUserAddress:", error);
    return { status: false, message: "An error occurred while adding the user address" };
   }
 }

async clearUserSession(token: string): Promise<void> {
  this.jwt.clearToken(token)
   return
}

}
