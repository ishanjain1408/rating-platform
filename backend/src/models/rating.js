import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Rating extends Model {}

Rating.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    rating: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: { min: 1, max: 5 }
    }
  },
  { sequelize, modelName: 'Ratings', tableName: 'Ratings' }
);

export default Rating;
