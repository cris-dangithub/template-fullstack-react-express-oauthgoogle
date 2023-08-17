import { Request } from 'express';
import { catchAsync } from '../lib/utils/catchAsync';
import appSuccess from '../lib/utils/appSuccess';
import { Users } from '../models/users.model';
import { mapAsync } from '../lib/utils/mapAsync';
import { getUrlFromFirebasePath } from '../lib/firebase/firebase.utils';

interface IReqCreateUser extends Request {}

/**
 * Obtiene todos los usuarios de la base de datos con:
 * status: true
 */
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll({
    where: {
      status: true,
    },
  });
  await mapAsync(users, async user => {
    if (user.profileImgUrl)
      user.profileImgUrl = await getUrlFromFirebasePath(user.profileImgUrl);
  });
  appSuccess(res, 200, 'Users obtained successfully', { users });
});
