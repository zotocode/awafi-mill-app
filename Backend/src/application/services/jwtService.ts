import { JwtPayload } from "jsonwebtoken";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import jwt from "jsonwebtoken";

export type jwtOutput = {
  payload: JwtPayload | null;
  message: string;
};

export class JWT implements Ijwt {
  constructor() {}

  generateToken(payload: string | object | Buffer, expiresIn: string | number, secretKey: string): string {
    // @ts-ignore
    return jwt.sign(payload, secretKey, { expiresIn });
  }

  verifyToken(token: string, secretKey: string): jwtOutput {
    try {
      // @ts-ignore
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      return {
        payload: decoded,
        message: "Authenticated",
      };
    } catch (error: any) {
      return {
        payload: null,
        message: error.message,
      };
    }
  }
}
