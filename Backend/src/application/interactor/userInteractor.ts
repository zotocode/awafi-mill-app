//userInteractor
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";

export class UserInteractor implements IUserInteractor{

  //make all things as private
  private userRepository: IUserRepo;
  

  constructor(
    userRepository: IUserRepo,
  ){
    this.userRepository= userRepository
  }



async login(email: string, password: string): Promise<any> {
    console.log('====================================');
    console.log("reached interactor..");
    console.log('====================================');
   
    try{
        const userData = await this.userRepository.findUser(email);
        console.log(userData);
        if(userData.password === password){
            console.log('====================================');
            console.log("login true");
            console.log('====================================');
        }else{
            console.log("false");
            
        }

    }catch(error){

    }

}

}