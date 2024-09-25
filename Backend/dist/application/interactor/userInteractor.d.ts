import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IBcrypt } from "../../interface/serviceInterface/bcryptInterface";
export declare class UserInteractor implements IUserInteractor {
    private userRepository;
    private bcrypt;
    constructor(userRepository: IUserRepo, bcrypt: IBcrypt);
    login(email: string, password: string): Promise<{
        success: boolean;
        message: string;
    }>;
    registerUser(data: any): Promise<{
        success: boolean;
        message: string;
        otp?: string;
    }>;
    verifyOtp(data: {
        otp: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
