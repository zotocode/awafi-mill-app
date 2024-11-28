import { UserDTO,UserActionResponse } from "../../domain/dtos/AdminDto";
import { IuserDocument } from "../../infrastructure/model/userModel";
import { LargeDataFetch } from "../../types/commonTypes";

export interface IUserRepo {
    findUser(email: string): Promise<any>;
    findAll(page:number,limit:number):Promise<LargeDataFetch>
    findUserEmail(email: string):Promise<IuserDocument | null>
    findUserByMobile(phone: number):Promise<IuserDocument | null>
    registerUser(data: any): Promise<string>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
    updateProfile(id: string, email: string, name: string, phone: number): Promise<void>; 
}