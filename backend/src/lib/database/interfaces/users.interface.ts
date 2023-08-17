import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { UserRoles } from '../../types/roles.types';

//TODODEV: Definir las interfaces de los modelos acá (relaciones y atributos)
//LINK: https://sequelize.org/docs/v6/other-topics/typescript/#usage-of-sequelizedefine
interface UserModelRelations {
  // Relaciones con otros modelos (ex: cartId: CreationOptional<number>)
  // ...
}

interface UserModelAttributes extends UserModelRelations {
  id: CreationOptional<number>;
  username: string;
  password: string;
  email: string;
  email_verified: CreationOptional<boolean>;
  role: UserRoles;
  profileImgUrl: CreationOptional<string | null>;
  status: CreationOptional<boolean>;
  passwordChangedAt: CreationOptional<Date>;
}

// use in model, extend request, etc... (ex1: const Users = user.define<UserModel>(...)); (ex2: interface ReqExtended extends Request {sessionUser: UserModel})
export interface UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
    UserModelAttributes {}
