import { IadminInteractor } from "../../interface/adminInterface/IadminInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import { UserResponse,UserDTO,UserActionResponse } from "../../domain/dtos/AdminDto";
import envConfig from "../../config/env";


let email =  envConfig.ADMIN_EMAIL
let password = envConfig.ADMIN_PASSWORD

 
export class AdminInteractor implements IadminInteractor {
  private userRepository: IUserRepo;
  private jwt: Ijwt;
  constructor(userRepository: IUserRepo ,jwt: Ijwt) {
    this.userRepository = userRepository;
    this.jwt = jwt;
  
  }
 
 async logIn(data: any): Promise<any> {
     if(data.email === email && password === data.password){
       
         const accessToken = this.jwt.generateToken({ id: data.email }, "30d");
         return { success: true, message: "Login successful", data: accessToken }; 
     }else{
    
        return { success: false, message: "Invalid credentials" };
     }
     
 }

 async usersData(): Promise<UserResponse> {
  try {
    const userData: UserDTO[] = await this.userRepository.findAll(); // Fetch users as UserDTO[]
    
    return {
      status: true,
      data: userData,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    
    return {
      status: false,
      data: [], // Handle no user data case
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
  async blockUser(email: string): Promise<UserActionResponse> { 
    try {
      const user = await this.userRepository.findUserEmail(email);
           if (!user) {
        console.log('User not found');
        return { success: false, message: 'User not found' };
      }  
      console.log('User found:', user);
      user.isBlocked = true; 
      await user.save(); 
  
      console.log('User successfully blocked');
      return { success: true};
  
    } catch (error) {
      console.error("Error blocking user:", error);
      return { success: false };
    }
  }



  async unblockUser(email: string): Promise<UserActionResponse> { 
    try {
      const user = await this.userRepository.findUserEmail(email);
           if (!user) {
        console.log('User not found');
        return { success: false, message: 'User not found' };
      }  
      console.log('User foundunblock', user);
      user.isBlocked = false; 
      await user.save(); 
      console.log('User successfully unblocked');
      return { success: true};
    } catch (error) {
      console.error("Error blocking user:", error);
      return { success: false };
    }
  }


 
}
