import { RequestHandler } from 'express';
import { AuthMiddleware } from '../../middlewares/authentication';

const authMiddleware = new AuthMiddleware();

export const handler: RequestHandler =
  authMiddleware.requireAuthenticated.bind(authMiddleware);
