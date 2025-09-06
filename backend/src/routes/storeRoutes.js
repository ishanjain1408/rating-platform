import { Router } from 'express';
import { listStores, rateStore, createStore  } from '../controllers/storeController.js';
import { authenticate, authorize, Roles } from '../middleware/auth.js';
import { ratingValidator, handleValidation } from '../middleware/validators.js';

const router = Router();

// Public list (no auth required)
router.get('/stores', listStores);

// Create store (Owner or Admin)
router.post(
  '/stores',
  authenticate,
  authorize(Roles.ADMIN, Roles.OWNER), // adjust roles as needed
  createStore
);

// Rate store (Normal User only)
router.post(
  '/stores/:id/rate',
  authenticate,
  authorize(Roles.USER),
  ratingValidator,
  handleValidation,
  rateStore
);

// Rate store (Normal User only)
router.post(
  '/stores/:id/rate',
  authenticate,
  authorize(Roles.USER),
  ratingValidator,
  handleValidation,
  rateStore
);

export default router;
