import { Router } from 'express';
import { listStores, rateStore, createStore  } from '../controllers/storeController.js';
import { authenticate, authorize, Roles } from '../middleware/auth.js';
import { ratingValidator, handleValidation } from '../middleware/validators.js';

const router = Router();

router.get('/stores', listStores);

router.post(
  '/stores',
  authenticate,
  authorize(Roles.ADMIN, Roles.OWNER),
  createStore
);

router.post(
  '/stores/:id/rate',
  authenticate,
  authorize(Roles.USER),
  ratingValidator,
  handleValidation,
  rateStore
);

router.post(
  '/stores/:id/rate',
  authenticate,
  authorize(Roles.USER),
  ratingValidator,
  handleValidation,
  rateStore
);

export default router;
