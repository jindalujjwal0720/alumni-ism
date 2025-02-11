import { RequestHandler } from 'express';
import { IOffer } from '../../../../types/models/offer';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { Model } from 'mongoose';
import Offer from '../../../../models/offer';

const updateOffer =
  (offerModel: Model<IOffer>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { description, tags } = req.body;

      const offer = await offerModel.findById(id);
      if (!offer) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Offer not found',
        );
      }

      offer.description = description;
      offer.tags = tags;

      await offer.save();
    } catch (err) {
      next(err);
    }
  };

const deleteOffer =
  (offerModel: Model<IOffer>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await offerModel.findByIdAndDelete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const put = updateOffer(Offer);
export const del = deleteOffer(Offer);
