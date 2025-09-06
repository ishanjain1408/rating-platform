import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ROLES = {
  ADMIN: 'System Administrator',
  USER: 'Normal User',
  OWNER: 'Store Owner'
};

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING(255), allowNull: false },
    address: { type: DataTypes.STRING(255) },
    role: {
      type: DataTypes.ENUM(ROLES.ADMIN, ROLES.USER, ROLES.OWNER),
      allowNull: false,
      defaultValue: ROLES.USER
    }
  },
  { sequelize, modelName: 'Users', tableName: 'Users' }
);

export default User;
