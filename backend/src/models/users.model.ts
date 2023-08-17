import { DataTypes } from 'sequelize';
import db from '../lib/database/db';
import { UserModel } from '../lib/database/interfaces/users.interface';
import { UserRoles } from '../lib/types/roles.types';

const modelRoles: UserRoles[] = ['user', 'superadmin', 'admin'];

export const Users = db.define<UserModel>('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  role: { type: DataTypes.ENUM(...modelRoles), allowNull: false },
  profileImgUrl: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  passwordChangedAt: { type: DataTypes.DATE, allowNull: true },
});

//LINK: https://stackoverflow.com/questions/64207295/what-type-does-sequelize-define-return-in-typescript
