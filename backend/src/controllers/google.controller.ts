import { Request } from 'express';
import appSuccess from '../lib/utils/appSuccess';
import { catchAsync } from '../lib/utils/catchAsync';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { generateJWT } from '../lib/utils/jwt';
import { UserModel } from '../lib/database/interfaces/users.interface';

interface IReqExtend extends Request {
  payload?: TokenPayload | undefined;
  user?: UserModel;
}

export const loginWithGoogle = catchAsync<IReqExtend>(
  async (req, res, next) => {
    const { user } = req;

    // Generar JWT de mi app
    let token;
    if (user) token = await generateJWT(user.id);

    appSuccess(res, 200, 'User logged with google successfully', { token, user });
  }
);
