// src/interface/userInterface/IuserInteractor.ts
import { UserInteractorResp } from "../../types/userTypes/userInteractorTypes"


export interface IUserInteractor{
    login(email:string,password:string):Promise<UserInteractorResp>
    registerUser(email:string,name:string,password:string,phone:number):Promise<any>
    verifyOtp(data:any):Promise<any>
    editProfile(data:any):Promise<any>

}

