import { RequestHandler } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../../../types/models/user';
import User from '../../../models/user';
import { AuthService } from '../../../services/auth';
import { publisher } from '../../../events';

const listAdmins =
  (userModel: Model<IUser>): RequestHandler =>
  async (req, res, next) => {
    try {
      const admins = await userModel.find({ roles: 'admin' });
      res.json({ admins });
    } catch (err) {
      next(err);
    }
  };

const createAdmin =
  (userModel: Model<IUser>, authService: AuthService): RequestHandler =>
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await authService.hashPassword(password);
      const user = new userModel({
        name,
        email,
        passwordHash: hashedPassword,
        roles: ['admin'],
      });
      await user.save();
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = listAdmins(User);
export const post = createAdmin(User, new AuthService(User, publisher));
