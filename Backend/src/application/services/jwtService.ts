import { JwtPayload } from "jsonwebtoken";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import jwt from "jsonwebtoken";
import tokens from "razorpay/dist/types/tokens";

export type jwtOutput = {
  payload: JwtPayload | null;
  message: string;
};

export class JWT implements Ijwt {
  constructor() {}

  generateToken(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, "JWT_PRIVATE_KEY", {
      expiresIn,
    });
  }


  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, "JWT_PRIVATE_KEY") as JwtPayload;
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
