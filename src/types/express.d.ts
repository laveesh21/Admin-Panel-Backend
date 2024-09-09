import { CustomJwtPayload } from '../middleware/authMiddleware'; // Adjust the path based on your project structure

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
