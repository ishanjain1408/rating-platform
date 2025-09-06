import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/index.js';
import { ROLES } from '../models/user.js';
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);

    // Only allow setting ADMIN via database seeding; prevent via API
    const finalRole =
      role && role === ROLES.ADMIN ? ROLES.USER : role || ROLES.USER;

    const user = await User.create({ name, email, password: hash, address, role: finalRole });

    // If role is Store Owner, optionally auto-create a placeholder store (optional)
    // await Store.create({ name: `${name}'s Store`, email: `store+${email}`, owner_id: user.id });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '1d' }
    );

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};
