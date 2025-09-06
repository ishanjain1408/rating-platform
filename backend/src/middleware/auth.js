import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ROLES } from '../models/user.js';
dotenv.config();

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    next();
  };

export const Roles = ROLES;
