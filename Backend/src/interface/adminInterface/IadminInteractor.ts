import { UserDTO,UserResponse,UserActionResponse } from "../../domain/dtos/AdminDto"
import { RevenueSummary,OrderSummary } from "../../domain/dtos/CheckoutDTO"

export interface IadminInteractor{
    logIn(data:any):Promise<any>
    usersData():Promise<UserResponse>
    blockUser(data:string):Promise<UserActionResponse>
    unblockUser(data:string):Promise<UserActionResponse>
    totalOrders():Promise<OrderSummary[]>
    totalRevenue(period:string|undefined):Promise<RevenueSummary[]>
   
}