import { Router } from 'express';
import { authenticate, authorize, Roles } from '../middleware/auth.js';
import { createStore, myStores, updateStore } from '../controllers/storeController.js';
import { storeCreateValidator, handleValidation } from '../middleware/validators.js';

const router = Router();

router.post(
  '/owner/stores',
  authenticate,
  authorize(Roles.OWNER, Roles.ADMIN),
  storeCreateValidator,
  handleValidation,
  createStore
);

router.get(
  '/owner/stores',
  authenticate,
  authorize(Roles.OWNER),
  myStores
);

router.patch(
  '/owner/stores/:id',
  authenticate,
  authorize(Roles.OWNER, Roles.ADMIN),
  updateStore
);

export default router;
