

export interface IUserRepo{
    findUser(email:string):Promise<any>
    registerUser(data:any):Promise<any>
   }