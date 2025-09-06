import { sequelize } from '../config/database.js';
import User from './user.js';
import Store from './store.js';
import Rating from './rating.js';

// User ↔ Stores
User.hasMany(Store, { foreignKey: 'owner_id', as: 'stores', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// Many-to-Many: User ↔ Store through Rating
User.belongsToMany(Store, { through: Rating, foreignKey: 'user_id', otherKey: 'store_id', as: 'ratedStores' });
Store.belongsToMany(User, { through: Rating, foreignKey: 'store_id', otherKey: 'user_id', as: 'raters' });

Rating.belongsTo(User, { foreignKey: 'user_id' });
Rating.belongsTo(Store, { foreignKey: 'store_id' });
User.hasMany(Rating, { foreignKey: 'user_id' });
Store.hasMany(Rating, { foreignKey: 'store_id' });

// Composite uniqueness: one rating per user per store
await sequelize.getQueryInterface().addConstraint('Ratings', {
  fields: ['user_id', 'store_id'],
  type: 'unique',
  name: 'unique_user_store'
}).catch(() => {});

export { sequelize, User, Store, Rating };
