<<<<<<< HEAD
import { User } from "../../domain/userSchema"
=======
import { User } from "../../domin/userSchema"
import { IuserDocument } from "../../infrastruture/model/userModel"
>>>>>>> upstream/main

export interface IUserRepo{
 findUser(email:string):Promise<any>
 registerUser(data:any):Promise<any>
}