import { Model } from 'mongoose';
import { IPayment, PaymentStatus } from '../../../types/models/payment';
import { RequestHandler } from 'express';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../utils/errors';
import Payment from '../../../models/payment';

const createPayment =
  (paymentModel: Model<IPayment>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const schema = Joi.object({
        category: Joi.string().valid('yearly', 'lifetime').required(),
        amountInINR: Joi.number().required(),
        amountInWords: Joi.string().required(),
        remark: Joi.string().optional().min(0),
        paymentVerificationLink: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      const payment = new paymentModel({
        account: id,
        category: req.body.category,
        amountInINR: req.body.amountInINR,
        amountInWords: req.body.amountInWords,
        remark: req.body.remark,
        paymentVerificationLink: req.body.paymentVerificationLink,
        status: PaymentStatus.IN_CONSIDERATION,
      });

      await payment.save();
      res.status(201).json({ payment });
    } catch (err) {
      next(err);
    }
  };

export const post = createPayment(Payment);
