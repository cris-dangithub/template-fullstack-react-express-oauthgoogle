import bcryptjs = require('bcryptjs');
//import { Users } from '../models/users.model';
import { appSuccess } from '../lib/utils/appSuccess';
import { catchAsync } from '../lib/utils/catchAsync';
import { generateJWT } from '../lib/utils/jwt';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase/firebase';
import AppError from '../lib/utils/appError';
import { Request } from 'express';
import { Users } from '../models/users.model';
import { UserModel } from '../lib/database/interfaces/users.interface';
import { clearFileNameSpaces } from '../lib/utils/clearFileNameSpaces';

//TODODEV: Cambiar según los modelos y requerimientos
interface IReqExtend extends Request {
  file?: Express.Multer.File;
  user?: UserModel;
}

export const createUser = catchAsync<IReqExtend>(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // 1. Creación de una constante con la referencia (si existe imagen de perfil)
  let imgUploaded = null;
  if (req.file) {
    /*
      En la ruta lo que hace es crearse una carpeta user y acá se almacenarán todas
      las imágenes de nuestros usuarios (en la aplicación de firebase, en la app).
      El nombre que tendrá será el mismo nombre  la hora de yo subirlo (mediante el req.file.originalname).
      El Date.now nos servirá para evitar que los archivos se reemplacen si tienen 2 nombres iguales.
    */
    clearFileNameSpaces(req.file);
    console.log(req.file);
    const imgRef = ref(storage, `user/${Date.now()}-${req.file.originalname}`);
    // Subimos la imagen a Firebase mediante uploadByes
    imgUploaded = await uploadBytes(imgRef, req.file.buffer);
  }

  // 2.1 Encriptacion de la contraseña. Primero generaremos los saltos
  /*
    salt permitirá hacer encriptación en saltos (es decir, que si le
    digo que me haga saltos de 3, me enciptará 1 vez, luego lo que encripte
    vuelve a encriptar, y así).

    genSalt es para generar la salt y hay 2 tipos: genSalt y genSaltSync. Debemos
    usar el genSalt pues debemos mantenernos en codigo asincrono. Se debe poner
    como argumentos los saltos a realizar. Lo máximo recomendado son 12 saltos, y
    lo minimo 10 saltos (no aconseja otros valores por abajo o por encima de estos)
  */
  const salt = await bcryptjs.genSalt(10);
  // 2.2 Generaremos contraseña encriptada
  /*
    hash le pasamos: contraseña del rest.body
    Le asignare la encriptacion de la contrasñea que recibo de la req.body y la 
    cantidad de saltos que genera esa contraseña
  */
  const crypPass = await bcryptjs.hash(password, salt);

  // 3. Guardar en la base de datos con las contraseñas encriptadas
  const user = await Users.create({
    username,
    email,
    password: crypPass,
    role,
    profileImgUrl: imgUploaded && `${imgUploaded.metadata.fullPath}`,
  });

  // 4. Generar el jwt
  /*
    Le mandamos el id del usuario que ya se creó en el punto 3
  */
  const token = await generateJWT(user.id);
  appSuccess(res, 201, 'User created successfully', {
    token,
    // Debo mandar ciertas cosas de user, NO MANDAR TODO EL USER
    /*
      Esto debido a que se mandan cosas importantes como el
      password (así esté encriptado), y otras cosas innecesarias como la creación
      del usuario.
    */
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImgUrl: user.profileImgUrl,
    },
  });
});

/**
 * Función de logueo en la app. Genera un token que servirá para
 * acceder a los servicios de la aplicación.
 * El body contendrá:
 * - email
 * - password (no obligatorio si se manda un payload)
 * - payload  (no obligatorio si se manda un password). El payload será
 *            lo generado mediante la librería de google.
 */
export const login = catchAsync<IReqExtend>(async (req, res, next) => {
  // 1. Desestructurar email y password del body
  const { password } = req.body;
  const { user } = req;
  if (!user) {
    return next(new AppError("user doesn't exists", 500));
  }
  // 2.2 Verificar que el password sea correcto
  /*
    .compare() me compara contraseñas que están encriptadas y me dice si es correcto o no
    Esto devolverá un true o un false, si son iguales devuelve true.
  */
  if (password && !(await bcryptjs.compare(password, user.password))) {
    // Si no son iguales: Contraseñas no son corDrectas
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3. Si todo está bien, enviar token al cliente
  /*
    Generaremos un token con la función creada para esto
  */
  const token = await generateJWT(user.id);
  const objExtras = {
    id: user.id,
    name: user.username,
    email: user.email,
    role: user.role,
  };
  return appSuccess(res, 200, 'Successfully logged in', {
    token,
    user: objExtras,
  });
});

interface IReqRenewTokenFn extends Request {
  sessionUser?: UserModel;
}
// Genera un nuevo token al usuario en sesión
export const renewToken = catchAsync<IReqRenewTokenFn>(
  async (req, res, next) => {
    // 1. Obtener el id del usuario en sesión
    if (!req.sessionUser) {
      const mess = 'sessionUser has not been added in the request object';
      return next(new AppError(mess, 500));
    }
    const { id } = req.sessionUser;

    // 2. Generar nuevo token
    const token = await generateJWT(id);

    // 3. Buscar el usuario (Este será el mismo del sessionUser, asi que no es obligatorio este paso)
    const user = await Users.findOne({
      attributes: ['id', 'username', 'email', 'role'],
      where: {
        id,
        status: true,
      },
    });

    // 4. Enviar respuesta al cliente
    return appSuccess(res, 200, undefined, { token, user });
  }
);

//TODO: Testear estas funcionalidades
