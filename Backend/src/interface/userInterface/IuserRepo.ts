import { User } from "../../domin/userSchema"
import { IuserDocument } from "../../infrastruture/model/userModel"
import { InewUserData } from "../../types/userTypes/userInteractorTypes"


export interface IUserRepo{
 findUser(email:string):Promise<any>
 registerUser(data:any):Promise<any>
}