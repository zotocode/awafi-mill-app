export interface IadminInteractor{
    logIn(data:any):Promise<any>
    usersData():Promise<any>
}