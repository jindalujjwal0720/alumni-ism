import { Model } from 'mongoose';
import {
  IPayment,
  PaymentStatus,
} from '../../../../../../types/models/payment';
import { AppError, CommonErrors } from '../../../../../../utils/errors';
import { IAlumni } from '../../../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { Alumni } from '../../../../../../models/alumni';
import Payment from '../../../../../../models/payment';

const acceptPayment =
  (
    paymentModel: Model<IPayment>,
    alumniModel: Model<IAlumni>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          'Payment ID is required',
        );
      }
      const payment = await paymentModel.findById(id);
      if (!payment) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Payment not found',
        );
      }

      // in years
      const { increaseValidityBy } = req.body;
      if (typeof increaseValidityBy === 'number') {
        const alumni = await alumniModel.findOne({ account: payment.account });
        if (!alumni) {
          throw new AppError(
            CommonErrors.NotFound.name,
            CommonErrors.NotFound.statusCode,
            'Alumni not found',
          );
        }

        const oldValidity = new Date(alumni.validity);
        const newValidity = new Date(oldValidity); // Create a copy
        newValidity.setFullYear(newValidity.getFullYear() + increaseValidityBy);

        alumni.validity = newValidity;

        await alumni.save();
      }

      payment.status = PaymentStatus.ACCEPTED;
      await payment.save();

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  };

export const post = acceptPayment(Payment, Alumni);
