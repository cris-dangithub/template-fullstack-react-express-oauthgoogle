import { Request } from 'express';
import { catchAsync } from '../lib/utils/catchAsync';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import AppError from '../lib/utils/appError';

interface IReqExtend extends Request {
  payload?: TokenPayload | undefined;
}

async function verify(token: string) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

export const protectGoogleToken = catchAsync<IReqExtend>(
  async (req, res, next) => {
    let token: string | undefined;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      // Dividir el Bearer del token y obtener el token que será el segundo indice (1)
      token = authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access', 401)
      );
    }
    const payload = await verify(token);
    //appSuccess(res, 200, 'token validated successfully', { payload });
    console.log(payload)
    req.payload = payload;
    req.body.email = payload?.email;
    next();
  }
);
