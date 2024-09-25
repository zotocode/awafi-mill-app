import { User } from "../../domain/userSchema"

export interface IUserRepo{
 findUser(email:string):Promise<any>
}