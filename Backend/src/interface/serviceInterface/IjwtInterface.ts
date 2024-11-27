import { JwtPayload } from "jsonwebtoken";

export interface Ijwt{
    generateToken(payload: object, expiresIn: string | number,secretKey:string): string;
    verifyToken(token: string,secretKey:string): any;
   
}
