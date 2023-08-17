import { validationResult } from 'express-validator';
import AppError from '../lib/utils/appError';
import { ReqResNextFn } from '../lib/types/reqResHandler.types';

export const validateFields: ReqResNextFn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new AppError('Check body error', 400, { errors: errors.mapped() })
    );
  }
  next();
};
