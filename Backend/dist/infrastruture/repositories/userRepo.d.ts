import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IuserDocument } from "../model/userModel";
export declare class UserRepo implements IUserRepo {
    findUser(email: string): Promise<IuserDocument | null>;
    registerUser(userData: any): Promise<string>;
}
