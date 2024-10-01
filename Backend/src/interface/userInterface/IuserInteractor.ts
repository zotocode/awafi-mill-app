// src/interface/userInterface/IuserInteractor.ts
import { UserInteractorResp } from "../../types/userTypes/userInteractorTypes"
import { userProfileDTO ,userPasswordChangeDTO} from "../../domain/dtos/UserDTO"

export interface IUserInteractor{
    login(email:string,password:string):Promise<UserInteractorResp>
    registerUser(email:string,name:string,password:string,phone:number):Promise<any>
    verifyOtp(email: string, otp: string):Promise<any>
    editProfile(id:string,email:string,name:string,phone:number):Promise<any>
    profileData(id:string):Promise<userProfileDTO|null>
    changeUserPassword(id:string,password?:string,newPassword?:string):Promise<userPasswordChangeDTO|null|undefined>
}
