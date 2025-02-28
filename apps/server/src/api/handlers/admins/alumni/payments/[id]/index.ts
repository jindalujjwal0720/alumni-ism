import { RequestHandler } from 'express';
import Payment from '../../../../../../models/payment';
import { AppError, CommonErrors } from '../../../../../../utils/errors';
import { Model } from 'mongoose';
import { IAlumni } from '../../../../../../types/models/alumni';
import { Alumni } from '../../../../../../models/alumni';
import { IPayment } from '../../../../../../types/models/payment';

const readPayment =
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

      const alumni = await alumniModel.findOne({ account: payment.account });
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      res.status(200).json({ payment, alumni });
    } catch (err) {
      next(err);
    }
  };

export const get = readPayment(Payment, Alumni);
