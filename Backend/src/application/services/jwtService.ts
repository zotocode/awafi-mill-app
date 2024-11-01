import { JwtPayload } from "jsonwebtoken";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import jwt from "jsonwebtoken";
import envConfig from "../../config/env";

export type jwtOutput = {
  payload: JwtPayload | null;
  message: string;
};

const invalidatedTokens = new Set<string>();

export class JWT implements Ijwt {
  constructor() {}

  generateToken(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, envConfig.JWT_SECRET_KEY, { expiresIn });
  }

  verifyToken(token: string): jwtOutput {
    if (invalidatedTokens.has(token)) {
      return {
        payload: null,
        message: "Token has been invalidated.",
      };
    }

    try {
      const decoded = jwt.verify(token, envConfig.JWT_SECRET_KEY) as JwtPayload;
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

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, envConfig.JWT_SECRET_KEY) as JwtPayload;
      return decoded;
    } catch (error: any) {
      return null;
    }
  }

  clearToken(token: string): void {
    invalidatedTokens.add(token);
  }
}
