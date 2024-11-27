import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../application/services/jwtService';
import envConfig from '../../config/env';

// Create an instance of your JWT service
const jwtService = new JWT();

// Middleware that adds user ID to req if a valid token is provided, without interrupting the flow
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    const { payload, message } = jwtService.verifyToken(token,envConfig.ACCESS_TOKEN_SECRET);
    console.log(message);

    // Attach user ID to req if token is valid
    if (payload) {
      req.user = { id: payload.id };

    }
  }
  
  // Continue to the next middleware or route handler, even if the token is missing or invalid
  next();
};
