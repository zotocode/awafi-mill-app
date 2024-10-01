// src/application/interactor/userInteractor.ts
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IBcrypt } from "../../interface/serviceInterface/IbcryptInterface";
import { generateOTP } from "../services/otpService";
import { UserInteractorResp } from "../../types/userTypes/userInteractorTypes";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import { UserDTO } from "../../domain/dtos/UserDTO";  // Import UserDTO

// Declare a global variable to store user data, including OTP
let globalUserData: { email: string; password: string; otp?: string } | null = null;

const nullifyGlobalUserData = () => {
  globalUserData = null;
  console.log("Global User Data has been nullified.");
};

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

  //=-========================================registerUser========================
  async registerUser(email: string, password: string): Promise<UserInteractorResp> {
    try {
      const userData = await this.userRepository.findUser(email);
      if (userData) {
        return { success: false, message: "User already registered" };
      }

      const otp = generateOTP();
      globalUserData = { email, password, otp };
      console.log("data", globalUserData);
      setTimeout(nullifyGlobalUserData, 300000); // Clear global data after 5 mins
      return { success: true, otp, message: "User registration initiated.." };
    } catch (error) {
      console.log("error", error);
      throw new Error("Registration failed");
    }
  }

  //=-========================================verifyOtp========================
  async verifyOtp(otp: string): Promise<UserInteractorResp> {
    try {
      if (globalUserData && otp === globalUserData.otp) {
        const hashedPassword = await this.bcrypt.encryptPassword(globalUserData.password);
  
        // Create new user using UserDTO
        const newUserDTO = new UserDTO(
          "some-id",                // Use actual user ID after creation if available
          "New User",               // Set an appropriate name or retrieve from globalUserData if needed
          globalUserData.email,
          hashedPassword,
          new Date(),
          new Date()
        );
  
        // Convert DTO to entity and register the user
        const newUser = UserDTO.toEntity(newUserDTO);
        const registeredUser = await this.userRepository.registerUser(newUser);
        
        // Map registered user to DTO for response
        const registeredUserDTO = UserDTO.fromEntity(registeredUser);
  
        nullifyGlobalUserData();
        return { 
          success: true, 
          message: "User registered successfully.", 
          data: registeredUserDTO  // Include user details in response
        };
      } else {
        return { success: false, message: "Invalid OTP." };
      }
    } catch (error) {
      console.log(error);
      throw new Error("OTP verification failed.");
    }
  }
  
}
