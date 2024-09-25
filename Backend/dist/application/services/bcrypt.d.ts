import { IBcrypt } from "../../interface/serviceInterface/bcryptInterface";
export declare class HashPassword implements IBcrypt {
    constructor();
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
