import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../utils/errors';

export const authorize =
  (allowedRoles: string[]): RequestHandler =>
  async (req, res, next) => {
    try {
      const { user } = req;
      const { roles } = user;
      const hasPermission = roles.some((role) => allowedRoles.includes(role));
      if (!hasPermission) {
        throw new AppError(
          CommonErrors.Forbidden.name,
          CommonErrors.Forbidden.statusCode,
          'You do not have permission to perform this action.',
        );
      }
    } catch (err) {
      next(err);
    }
  };
