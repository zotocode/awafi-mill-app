// Declare a global variable to store user data, including OTP
let globalUserData: { email: string; password: string; otp?: string } | null =
  null;

const nullifyGlobalUserData = () => {
  globalUserData = null;
  console.log("Global User Data has been nullified.");
};

// userInteractor.ts
import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { User } from "../../domin/userSchema";
import { IBcrypt } from "../../interface/serviceInterface/bcryptInterface";
import { generateOTP } from "../services/otpService";
// userInteractor.ts

export class UserInteractor implements IUserInteractor {
  private userRepository: IUserRepo;
  private bcrypt: IBcrypt;

  constructor(userRepository: IUserRepo, bcrypt: IBcrypt) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
  }

  //=-========================================login===============
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      const userData = await this.userRepository.findUser(email);
      if (userData && userData.password === password) {
        globalUserData = { email, password };
        
        setTimeout(nullifyGlobalUserData, 300000);

        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  }
  //=-========================================registration========================
  async registerUser(data: any): Promise<{ success: boolean; message: string; otp?: string }> {
    try {
        
        const otp = generateOTP();
        globalUserData = { email: data.email, password: data.password, otp };
        console.log("data",globalUserData)
        setTimeout(nullifyGlobalUserData, 300000);
        return { success: true, otp, message: "User registration  initiated.." };
    } catch (error) {
        throw new Error("Registration failed");
    }
}
 //=-========================================otpverify========================
// userInteractor.ts
async verifyOtp(data: { otp: string }): Promise<{ success: boolean; message: string }> {
  try {
    console.log("hi email",globalUserData?.email)
    // Check if the OTP matches the one stored in globalUserData
    if (globalUserData && data.otp === globalUserData.otp) {
      // Hash the password
      const hashedPassword = await this.bcrypt.encryptPassword(globalUserData.password);
    console.log("hi email",globalUserData.email)
      // Create a new user using the global data
      // const newUser = new User({
      //    name:"hihello",
      //   email: globalUserData.email as string,
      //   password: hashedPassword,
      // });

      // // Save the new user in the repository
      // const register = await this.userRepository.registerUser(newUser);

      // Nullify global user data after registration
      nullifyGlobalUserData();

      return { success: true, message: "User registered successfully." };
    } else {
      // OTP does not match
      return { success: false, message: "Invalid OTP." };
    }
  } catch (error) {
    throw new Error("OTP verification failed.");
  }
}

}
