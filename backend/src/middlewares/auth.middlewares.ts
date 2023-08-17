import { catchAsync } from '../lib/utils/catchAsync';
//TODODEV: Cambiar al nombre del modelo correspondiente
import AppError from '../lib/utils/appError';
import { decodeJWT } from '../lib/utils/jwt';
import { ReqResNextFn } from '../lib/types/reqResHandler.types';
import { UserRoles } from '../lib/types/roles.types';
import { Request } from 'express';
import { UserModel } from '../lib/database/interfaces/users.interface';
import { Users } from '../models/users.model';

//TODODEV: Cambiar IReqExtend según lo requerido (user y sessionUser de las interfaces de los modelos) (Estos pueden ser varias interfaces segun el middleware a usar)
interface IReqExtend extends Request {
  user?: UserModel;
  sessionUser?: UserModel;
}

/**
 * Protege las rutas de mi aplicación.
 * Suele usarse mediante el "router.use('protect')"
 */
export const protect = catchAsync<IReqExtend>(async (req, res, next) => {
  // 1. Verificar que el token venga
  /*
    En React le mandabamos al back el token por los headers y con una palabra clave
    "Bearer"
  */
  let token;
  //TODO: Testear el req.headers
  //TODODEV: Extender la authorization
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

  // 2. Verificar y decodificar el token (Si no ha expirado)
  /*
    El token se puede decodificar con el payload y la llave secreta (de la misma manera que
    se codifica se puede decodificar)
    Problema es que esto no devuelve una promesa, entonces usaremos una funcion en javascript
    que convierte un callback en una promesa (promisify). Debemos importarla mediante require('util')
  */

  //TODO: Testear que decoded funcione y que todos los tipos sean correctos
  const decoded = await decodeJWT(token);

  if (typeof decoded === 'string' || !decoded?.iat) {
    return next(new AppError('decoded is string, it must be an object', 500));
  }
  // 3. Checkear que el usuario exista
  const user = await Users.findOne({
    where: {
      // le paso el id del usuario decodificado
      id: decoded.id,
      status: true,
    },
  });
  if (!user) {
    return next(
      new AppError('The owner of this token is not longer available', 401)
    );
  }

  // 4. Verificar si el usuario ha cambiado la contraseña después de que el token haya sido expirado
  /*
    Para cambiar de fecha a tiempo con función de javascript-> getTime
    En milisegundos, pero lo necesitamos en segundos. Usaremos parseInt para que
    sea menos suceptible a errores y lo dividimos entre mil para convertir a segundos
  */
  //console.log(user.passwordChangedAt.getTime());
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      `${user.passwordChangedAt.getTime() / 1000}`,
      10
    );
    /*
      Si el usuario cambió la contraseña
    */
    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError('User recently changed password!, please login again', 401)
      );
    }
  }
  // Usuario en sesión
  req.sessionUser = user;
  next();
});

// Este middleware protege el token del usuario
/*
  Lo misión principal será validar que el usuario que esté intentando
  realizar la acción sea el mismo que se logeó
*/

export const protectAccountOwner = catchAsync<IReqExtend>(
  async (req, res, next) => {
    // Obtener el usuario que viene de la request
    const { user, sessionUser } = req;
    // Validar que el usuario en sesion sea el usuario que está haciendo la petición
    /*
    En un caso podría haber un "suepradmin", entonces valida si el role del usuario
    en sesion es superadmin para saltarse dicho error
  */
    if (user?.id !== sessionUser?.id && sessionUser?.role !== 'superadmin') {
      return next(new AppError('You are not the owner of this account', 401));
    }
    next();
  }
);

// Para restringir por roles
/*
  El spread operator guarda las variables en un array con nombre "roles".
  Los que recibo por argumento son los roles permitidos
*/
export const restrictTo = (...roles: UserRoles[]): ReqResNextFn<IReqExtend> => {
  return (req, res, next) => {
    // 1. Comprar los roles con el rol del usuario en sesión (el que viene del token)
    if (!req.sessionUser) {
      return next(new AppError('sessionUser not found in the req object', 500));
    }
    const { role } = req.sessionUser;
    if (!roles.includes(role)) {
      return next(
        /*
          Codigo de estado 403: Forbiden (una petición rechazada). Es mas especifico
          para este tipo de casos como los roles
        */
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
