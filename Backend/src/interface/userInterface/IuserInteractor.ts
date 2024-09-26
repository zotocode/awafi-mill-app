// src/interface/userInterface/IuserInteractor.ts
import { UserInteractorResp } from "../../types/userTypes/userInteractorTypes"


export interface IUserInteractor{
    login(email:string,password:string):Promise<UserInteractorResp>
    registerUser(email:string,password:string):Promise<any>
    verifyOtp(data:any):Promise<any>

}

