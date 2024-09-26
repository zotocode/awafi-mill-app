import { User } from "../../domain/entities/userSchema"
import { IuserDocument } from "../../infrastrucutre/model/userModel"
import { InewUserData } from "../../types/userTypes/userInteractorTypes"


export interface IUserRepo{
 findUser(email:string):Promise<any>
 registerUser(data:any):Promise<any>
}