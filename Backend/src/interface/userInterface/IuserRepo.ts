import { User } from "../../domain/userSchema"
import { IuserDocument } from "../../infrastrucutre/model/userModel"

export interface IUserRepo{
 findUser(email:string):Promise<any>
 registerUser(data:any):Promise<any>
}