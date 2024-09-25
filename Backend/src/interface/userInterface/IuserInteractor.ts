export interface IUserInteractor{
    login(email:string,password:string):Promise<any>
}