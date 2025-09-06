import { Router } from 'express';
import { authenticate, authorize, Roles } from '../middleware/auth.js';
import { User, Store } from '../models/index.js';
import { dashboard } from '../controllers/adminController.js';

const router = Router();

router.get('/admin/dashboard', authenticate, authorize(Roles.ADMIN), dashboard);

router.get('/admin/users', authenticate, authorize(Roles.ADMIN), async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'address', 'role'] });
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/admin/users', authenticate, authorize(Roles.ADMIN), async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const user = await User.create({ name, email, password, address, role });
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admin/stores', authenticate, authorize(Roles.ADMIN), async (req, res) => {
  try {
    const stores = await Store.findAll({ attributes: ['id', 'name', 'email', 'address'] });
    res.json(stores);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/admin/stores', authenticate, authorize(Roles.ADMIN), async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address, owner_id: req.user.id });
    res.status(201).json(store);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
