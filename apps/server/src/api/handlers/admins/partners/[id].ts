import { RequestHandler } from 'express';
import User from '../../../../models/user';
import { Model } from 'mongoose';
import { IUser } from '../../../../types/models/user';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { IPartner } from '../../../../types/models/partner';
import Partner from '../../../../models/partner';

const readPartner =
  (partnerModel: Model<IPartner>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const partner = await partnerModel.findById(id).select('partnerData');
      if (!partner) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'User not found',
        );
      }

      res.json({ partner });
    } catch (err) {
      next(err);
    }
  };

const updatePartner =
  (partnerModel: Model<IPartner>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const partner = await partnerModel.findById(id);
      if (!partner) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Partner not found',
        );
      }

      const { name, logo, supportUrl, about } = req.body;
      partner.name = name;
      partner.logo = logo;
      partner.supportUrl = supportUrl;
      partner.about = about;
      await partner.save();

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

const deletePartner =
  (userModel: Model<IUser>, partnerModel: Model<IPartner>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const partner = await partnerModel.findById(id);
      if (!partner) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Partner not found',
        );
      }

      await userModel.deleteOne({ _id: partner.account });
      await partner.deleteOne();

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const get = readPartner(Partner);
export const put = updatePartner(Partner);
export const del = deletePartner(User, Partner);
