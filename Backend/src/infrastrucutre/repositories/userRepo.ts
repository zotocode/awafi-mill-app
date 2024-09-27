// src/infrastructure/repositories/userRepo.ts
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IUserDocument, userModel } from "../model/userModel";
import { InewUserData } from "../../types/userTypes/userInteractorTypes";
import { BaseRepository } from "./baseRepository";

export class UserRepo extends BaseRepository<IUserDocument> implements IUserRepo {
    constructor() {
        super(userModel); 
    }

    async findUser(email: string): Promise<IUserDocument | null> {
        try {
          return await this.model.findOne({ email }); 
        } catch (error) {
          console.error("Error finding user:", error);
          throw error;
        }
      }
  
      async registerUser(userData: InewUserData): Promise<string> {
        console.log("user register  repo..", userData);
    
        const newUser = new this.model(userData);
        await newUser.save();
        
        return "registration completed";
      }
      
}