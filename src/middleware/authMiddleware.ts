import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

// Interface for the JWT payload
export interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

// Middleware to authenticate JWT token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user as CustomJwtPayload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Middleware to authorize based on user role
export const authorizeRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (roles.includes(req.user?.role || '')) {
    next();
  } else {
    res.sendStatus(403);
  }
};
