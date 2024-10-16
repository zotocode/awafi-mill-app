import { IadminInteractor } from "../../interface/adminInterface/IadminInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";

export class AdminInteractor implements IadminInteractor {
  private userRepository: IUserRepo;
  private jwt: Ijwt;
  constructor(userRepository: IUserRepo ,jwt: Ijwt) {
    this.userRepository = userRepository;
    this.jwt = jwt
  }
 
 async logIn(data: any): Promise<any> {
     console.log("reached interactor..",data);
     let email = "admin@gmail.com"
     let password = "12345"
     if(data.email === email && password === data.password){
         console.log("true");
         const accessToken = this.jwt.generateToken({ id: data.email }, "1h");
         return { success: true, message: "Login successful", data: accessToken }; 
     }else{
        console.log("false");
        return { success: false, message: "Invalid credentials" };
     }
     
 }

  async usersData() {
    try {
      let userData = await this.userRepository.find();
      return userData
    } catch (error) {

    }
  }
}
