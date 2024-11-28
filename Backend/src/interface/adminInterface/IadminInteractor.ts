import { UserDTO,UserResponse,UserActionResponse } from "../../domain/dtos/AdminDto"
import { RevenueSummary,OrderSummary } from "../../domain/dtos/CheckoutDTO"
import { LargeDataFetch } from "../../types/commonTypes"

export interface IadminInteractor{
    logIn(data:any):Promise<any>
    usersData(page:number,limit:number):Promise<LargeDataFetch>
    blockUser(data:string):Promise<UserActionResponse>
    unblockUser(data:string):Promise<UserActionResponse>
   
}