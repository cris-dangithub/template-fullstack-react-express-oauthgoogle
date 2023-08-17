import { Request } from 'express';
import AppError from '../lib/utils/appError';
import { catchAsync } from '../lib/utils/catchAsync';
import { Users } from '../models/users.model';
import { UserModel } from '../lib/database/interfaces/users.interface';

interface IReqExtend extends Request {
  user?: UserModel;
}

export const validIfUserExistsByEmail = catchAsync<IReqExtend>(
  async (req, res, next) => {
    const { email } = req.body;
    const user = await Users.findOne({
      where: {
        email: email.toLowerCase(),
        status: true,
      },
    });
    if (!user) {
      return next(new AppError('The user could not be found', 404));
    }
    req.user = user;
    next();
  }
);

export const validIfUserIsVerified = catchAsync<IReqExtend>(
  async (req, res, next) => {
    const { user } = req;

    if (!user?.email_verified) {
      return next(
        new AppError(
          'Your email address has not been verified yet. Please check your inbox for a verification link and follow the instructions to verify your email.',
          403
        )
      );
    }
    next();
  }
);
