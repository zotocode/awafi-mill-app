import { User } from "../../domin/userSchema"

export interface IUserRepo{
 findUser(email:string):Promise<any>
}