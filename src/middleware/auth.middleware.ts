import { Request, Response, NextFunction } from 'express';
import { AuthService, TokenPayload  } from '../services/auth';
import { UnauthorizedError } from '../apperrors';

export const authenticateKey = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
       res.status(401).json({
      status: 'fail',
      message: 'Unauthorized: Missing api-key header'
    });

     return;
    }
    next();
};
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

const authService = new AuthService();

export const authenticateJWT = (req : Request, _res : Response, next : NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new UnauthorizedError('Missing or invalid Authorization header'));
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = authService.verifyToken(token);
        next();
    } catch {
        next(new UnauthorizedError('Invalid or expired token'));
    }
};
