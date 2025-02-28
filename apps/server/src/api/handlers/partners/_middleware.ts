import { RequestHandler } from 'express';
import { AuthMiddleware } from '../../middlewares/authentication';
import { authorize } from '../../middlewares/authorization';

const authMiddleware = new AuthMiddleware();

export const handler: RequestHandler[] = [
  authMiddleware.requireAuthenticated.bind(authMiddleware),
  authorize(['partner']),
];
