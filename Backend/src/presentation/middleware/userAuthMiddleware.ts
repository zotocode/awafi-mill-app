import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../application/services/jwtService'; 


// Create an instance of your JWT service
const jwtService = new JWT();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  const { payload, message } = jwtService.verifyToken(token);

  if (!payload) {
    return res.status(403).json({ status: false, message });
  }
  req.user = { id: payload.id };
  req.token =token
  next();
};
    