import { fn, col, literal } from 'sequelize';
import { User, Store, Rating } from '../models/index.js';

export const dashboard = async (req, res) => {
  try {
    const [usersCount, storesCount, ratingsCount] = await Promise.all([
      User.count(),
      Store.count(),
      Rating.count()
    ]);

    const topStores = await Store.findAll({
      attributes: [
        'id',
        'name',
        [fn('ROUND', fn('AVG', col('Ratings.rating')), 2), 'avgRating'],
        [fn('COUNT', col('Ratings.id')), 'ratingsCount']
      ],
      include: [
        {
          model: Rating,
          attributes: []
        }
      ],
      group: ['Stores.id'],
      order: [[literal('avgRating'), 'DESC']],
      limit: 10,
      subQuery: false // important to avoid extra wrapping
    });

    const byRole = await User.findAll({
      attributes: ['role', [fn('COUNT', col('id')), 'count']],
      group: ['role']
    });

    return res.json({
      stats: { usersCount, storesCount, ratingsCount },
      usersByRole: byRole,
      topStores
    });
  } catch (e) {
    console.error('DASHBOARD ERROR:', e);
    return res.status(500).json({ message: 'Server error' });
  }
};
