import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Store extends Model {}

Store.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    address: { type: DataTypes.STRING(255) }
  },
  { sequelize, modelName: 'Stores', tableName: 'Stores' }
);

export default Store;
