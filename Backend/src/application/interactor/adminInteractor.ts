import { IadminInteractor } from "../../interface/adminInterface/IadminInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";

let email =  process.env.ADMIN_EMAIL
let password = process.env.ADMIN_PASSWORD
 
export class AdminInteractor implements IadminInteractor {
  private userRepository: IUserRepo;
  private jwt: Ijwt;
  constructor(userRepository: IUserRepo ,jwt: Ijwt) {
    this.userRepository = userRepository;
    this.jwt = jwt
  }
 
 async logIn(data: any): Promise<any> {
     if(data.email === email && password === data.password){
         console.log("true");
         const accessToken = this.jwt.generateToken({ id: data.email }, "30d");
         return { success: true, message: "Login successful", data: accessToken }; 
     }else{
        console.log("false");
        return { success: false, message: "Invalid credentials" };
     }
     
 }

  async usersData() {
    try {
      let userData = await this.userRepository.find();
      return userData
    } catch (error) {
      console.log("false");
      return { success: false, message: "Invalid credentials" };
    }
  }

  async blockUser(email: string): Promise<any> { 
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

  async unblockUser(email: string): Promise<any> { 
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
