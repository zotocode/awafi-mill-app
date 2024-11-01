// src/interface/userInterface/IuserInteractor.ts
import { UserInteractorResp } from "../../types/userTypes"
import { userProfileDTO ,userPasswordChangeDTO} from "../../domain/dtos/UserDTO"

export interface IUserInteractor{
    login(email:string,password:string):Promise<UserInteractorResp>
    registerUser(email:string,name:string,password:string,phone:number):Promise<any>
    verifyOtp(email: string, otp: string):Promise<any>
    editProfile(id:string,email:string,name:string,phone:number):Promise<any>
    profileData(id:string):Promise<userProfileDTO|null>
    changeUserPassword(id:string,password?:string,newPassword?:string):Promise<userPasswordChangeDTO|null|undefined>
    addUserAddress(id:string,address:any):Promise<any>
    editUserAddress(id:string, newAddress:any):Promise<any>; 
    forgotPassword(email:string):Promise<any>
    verifyFogotOtp(email:string,userOtp:string):Promise<any>
    updateNewPassword(email:string,otp:string,newPassword:string):Promise<any>
}
