// src/infrastructure/repositories/userRepo.ts
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IuserDocument, userModel } from "../model/userModel";
import { InewUserData } from "../../types/userTypes/userInteractorTypes";
import { BaseRepository } from "./baseRepository";

export class UserRepo extends BaseRepository<IuserDocument> implements IUserRepo {
    constructor() {
        super(userModel); 
    }

    async findUser(email: string): Promise<IuserDocument | null> {
        try {
          return await this.model.findOne({ email }); 
        } catch (error) {
          console.error("Error finding user:", error);
          throw error;
        }
      }
  
      async registerUser(userData: InewUserData): Promise<string> {
        console.log("user register  repo..", userData);
    
        const newUser = new this.model({  
          email: userData.email,
          password: userData.password,
          userName: userData.name,
        });
        await newUser.save();
        return "registration completed";
      }
      
}