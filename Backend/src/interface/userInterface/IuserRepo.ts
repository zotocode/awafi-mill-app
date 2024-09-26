<<<<<<< HEAD
import { User } from "../../domain/userSchema"
import { IuserDocument } from "../../infrastrucutre/model/userModel"
=======
import { User } from "../../domin/userSchema"
import { IuserDocument } from "../../infrastruture/model/userModel"
import { InewUserData } from "../../types/userTypes/userInteractorTypes"

>>>>>>> upstream/main

export interface IUserRepo{
 findUser(email:string):Promise<any>
 registerUser(data:any):Promise<any>
}