
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IuserDocument,userModel } from "../model/userModel";


export class UserRepo implements IUserRepo {

    async findUser(email: string): Promise<IuserDocument | null> {
        try {
          const user = await userModel.findOne({ email });
          return user;
        } catch (error) {
          console.error("Error finding user:", error);
          throw error;
        }
      }

}