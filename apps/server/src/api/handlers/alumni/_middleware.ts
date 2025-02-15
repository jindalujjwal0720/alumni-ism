import { RequestHandler } from 'express';
import { authorize } from '../../middlewares/authorization';

export const handler: RequestHandler = authorize(['student']);
