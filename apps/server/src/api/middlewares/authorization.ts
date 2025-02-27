import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../utils/errors';
import { IUserRole } from '../../types/models/user';

export const authorize =
  (allowedRoles: IUserRole[]): RequestHandler =>
  async (req, res, next) => {
    try {
      const { user } = req;
      const { roles } = user;
      const hasPermission = roles.some((role) =>
        allowedRoles.includes(role as IUserRole),
      );
      if (!hasPermission) {
        throw new AppError(
          CommonErrors.Forbidden.name,
          CommonErrors.Forbidden.statusCode,
          'You do not have permission to perform this action.',
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
