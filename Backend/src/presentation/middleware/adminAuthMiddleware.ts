import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../application/services/jwtService';
import { JwtPayload } from 'jsonwebtoken';
import envConfig from '../../config/env';

const email = process.env.ADMIN_EMAIL; // Get the admin email from the environment variables
const jwtService = new JWT();

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const { payload, message } = jwtService.verifyToken(token,envConfig.ACCESS_TOKEN_SECRET);
    if (!payload) {
        return res.status(403).json({ status: false, message });
    }
    if (payload.id !== email) {
        return res.status(403).json({ status: false, message: 'Unauthorized: Invalid email' });
    }
    (req as any).user = { id: payload.id };
    next();
};
