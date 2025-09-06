import { Op, fn, col, literal } from 'sequelize';
import { Store, Rating, User } from '../models/index.js';
import { ROLES } from '../models/user.js';

export const listStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: {
        include: [
          [fn('ROUND', fn('AVG', col('Ratings.rating')), 2), 'avgRating'],
          [fn('COUNT', col('Ratings.id')), 'ratingsCount']
        ]
      },
      include: [{ model: Rating, attributes: [] }],
      group: ['Stores.id'],   // 👈 change from 'Stores.id'
      order: [[literal('avgRating'), 'DESC']] // 👈 remove "NULLS LAST" if using MySQL
    });

    return res.json(stores);
  } catch (e) {
    console.error('Error in listStores:', e); // 👈 log full error
    return res.status(500).json({ message: e.message }); // 👈 send error message back
  }
};


export const rateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    // Upsert: one rating per user per store
    const [row, created] = await Rating.findOrCreate({
      where: { user_id: req.user.id, store_id: id },
      defaults: { rating }
    });

    if (!created) {
      row.rating = rating;
      await row.save();
    }

    return res.status(created ? 201 : 200).json({
      message: created ? 'Rating created' : 'Rating updated',
      rating: row
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const ownerId =
      req.user.role === ROLES.ADMIN && req.body.owner_id
        ? req.body.owner_id
        : req.user.id; // Owners create for themselves

    const exists = await Store.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Store email already used' });

    const store = await Store.create({ name, email, address, owner_id: ownerId });
    return res.status(201).json(store);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const myStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      where: { owner_id: req.user.id },
      attributes: {
        include: [
          [fn('ROUND', fn('AVG', col('Ratings.rating')), 2), 'avgRating'],
          [fn('COUNT', col('Ratings.id')), 'ratingsCount']
        ]
      },
      include: [{ model: Rating, attributes: [] }],
      group: ['Stores.id']
    });
    return res.json(stores);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    // Only owner or admin
    if (req.user.role !== ROLES.ADMIN && store.owner_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatable = ['name', 'email', 'address'];
    updatable.forEach((k) => req.body[k] !== undefined && (store[k] = req.body[k]));
    await store.save();

    return res.json(store);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};
