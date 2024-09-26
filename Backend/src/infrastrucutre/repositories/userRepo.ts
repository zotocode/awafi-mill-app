
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { userModel } from "../model/userModel";
import { InewUserData } from "../../types/userTypes/userInteractorTypes";


export class UserRepo implements IUserRepo {

    async findUser(email: string): Promise<any | null> {
        try {
          const user = await userModel.findOne({ email });
          return user;
        } catch (error) {
          console.error("Error finding user:", error);
          throw error;
        }
      }
  
      async registerUser(userData: InewUserData): Promise<string> {
        console.log("user register  repo..", userData);
    
        const newUser = new userModel({
          email: userData.email,
          password: userData.password,
          userName: userData.name,
        });
        await newUser.save();
        
        return "registration completed";
      }
      
}