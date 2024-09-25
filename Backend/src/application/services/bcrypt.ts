
import bcrypt from "bcryptjs";
import { IBcrypt } from "../../interface/serviceInterface/bcryptInterface";
export class HashPassword implements IBcrypt  {
  constructor() {}
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
      
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      console.log("compairig... here");
      
        return await bcrypt.compare(password,hashedPassword)
    } catch (error) {
        throw error;
    }
    
}
}
