// src/infrastructure/repositories/userRepo.ts
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IuserDocument, userModel } from "../model/userModel";
import { InewUserData } from "../../types/userTypes";
import { BaseRepository } from "./baseRepository";
import { UserDTO } from "../../domain/dtos/AdminDto";

export class UserRepo extends BaseRepository<IuserDocument> implements IUserRepo {
  constructor() {
    super(userModel);
  }

  async findUserEmail(email: string): Promise<IuserDocument | null> {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }
  async findUserByMobile(phone: number): Promise<IuserDocument | null> {
    try {
      return await this.model.findOne({ phone });
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
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
        return "registration completed"
      }


      async updatePassword(id: string, hashedPassword: string): Promise<void> {
      await userModel.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    }
      
    async updateProfile(id: string, email: string, name: string, phone: number): Promise<void> {
      const updateFields: any = {};
    
      // Build update object only with defined fields
      if (email !== undefined) updateFields.email = email; 
      if (name !== undefined) updateFields.name = name;
      if (phone !== undefined) updateFields.phone = phone; 
    
      if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
      }  
      const result = await userModel.updateOne(
        { _id: id },  
        { $set: updateFields }  
      );
      
    }

    async findAll(): Promise<UserDTO[]> {  // Ensure return type is strictly UserDTO[]
      try {
        const users: IuserDocument[] = await this.model.find({}); // Fetch users as IuserDocument[]
        
        // Map the raw Mongoose documents to UserDTO
        const userDTOs: UserDTO[] = users.map((user: IuserDocument) => ({
          _id: user._id.toString(), // Convert ObjectId to string
          email: user.email,
          name: user.name,
          phone: user.phone,
          isBlocked: user.isBlocked,
        }));
  
        return userDTOs; // Return UserDTO[]
      } catch (error) {
        console.error("Error finding users:", error);
        throw error; // Rethrow error for further handling
      }
    }
}