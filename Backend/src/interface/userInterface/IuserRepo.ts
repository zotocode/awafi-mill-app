import { User } from "../../domin/userSchema"
import { IuserDocument } from "../../infrastruture/model/userModel"

export interface IUserRepo{
 findUser(email:string):Promise<any>
 registerUser(data:any):Promise<any>
}