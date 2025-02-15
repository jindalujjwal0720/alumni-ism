import { RequestHandler } from 'express';
import User from '../../../../models/user';
import { AuthService } from '../../../../services/auth';
import { publisher } from '../../../../events';
import { IPartner } from '../../../../types/models/partner';
import { Model } from 'mongoose';
import Partner from '../../../../models/partner';
import { IUser } from '../../../../types/models/user';

const listPartners =
  (partnerModel: Model<IPartner>): RequestHandler =>
  async (req, res, next) => {
    try {
      const partners = await partnerModel.find();
      res.status(200).json({ partners });
    } catch (err) {
      next(err);
    }
  };

const createPartner =
  (userModel: Model<IUser>, authService: AuthService): RequestHandler =>
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

const authService = new AuthService(User, publisher);

export const get = listPartners(Partner);
export const post = createPartner(User, authService);
