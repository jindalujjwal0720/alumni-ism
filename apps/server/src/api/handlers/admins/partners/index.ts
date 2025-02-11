import { RequestHandler } from 'express';
import User from '../../../../models/user';
import { AuthService } from '../../../../services/auth';
import { publisher } from '../../../../events';

const listPartners =
  (userModel: typeof User): RequestHandler =>
  async (req, res, next) => {
    try {
      const partners = await userModel.find({ roles: 'partner' });
      res.json({ partners });
    } catch (err) {
      next(err);
    }
  };

const createPartner =
  (userModel: typeof User, authService: AuthService): RequestHandler =>
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await authService.hashPassword(password);
      const user = new userModel({
        name,
        email,
        passwordHash: hashedPassword,
        roles: ['partner'],
      });
      await user.save();
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = listPartners(User);
export const post = createPartner(User, new AuthService(User, publisher));
