// src/types/express/index.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string; // Optional if not always provided
      };
    }
  }
}
