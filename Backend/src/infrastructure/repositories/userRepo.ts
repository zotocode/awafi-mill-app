// src/infrastructure/repositories/userRepo.ts
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IuserDocument, userModel } from "../model/userModel";
import { InewUserData } from "../../types/userTypes/userInteractorTypes";
import { BaseRepository } from "./baseRepository";

export class UserRepo extends BaseRepository<IuserDocument> implements IUserRepo {
    constructor() {
        super(userModel); 
    }

    async findUser(id: string): Promise<IuserDocument | null> {
        try {
          return await this.model.findById(id); 
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
          name: userData.name,
          phone:userData.phone
        });
        await newUser.save();
        return "registration completed";
      }

      async updatePassword(id: string, hashedPassword: string): Promise<void> {
        await userModel.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    }
      
    async updateProfile(id: string, email: string, name: string, phone: number): Promise<void> {
      const updateFields: any = {}; 
      if (email !== undefined) updateFields.email = email;
      if (name !== undefined) updateFields.name = name;
      if (phone !== undefined) updateFields.phone = phone;  // Now phone is a number
      if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
      } 
      await userModel.updateOne(
        { _id: id },  // Convert the id to ObjectId if needed
        { $set: updateFields }      // Dynamically constructed update object
      );
    }
}