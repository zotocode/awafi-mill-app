import { UserDTO,UserActionResponse } from "../../domain/dtos/AdminDto";
import { IuserDocument } from "../../infrastructure/model/userModel";

export interface IUserRepo {
    findUser(email: string): Promise<any>;
    findAll():Promise<UserDTO[]>
    findUserEmail(email: string):Promise<IuserDocument | null>
    registerUser(data: any): Promise<string>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
    updateProfile(id: string, email: string, name: string, phone: number): Promise<void>; 

}