export interface IadminInteractor{
    logIn(data:any):Promise<any>
    usersData():Promise<any>
    blockUser(data:string):Promise<any>
    unblockUser(data:string):Promise<any>
}