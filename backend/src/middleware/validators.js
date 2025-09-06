import { body, validationResult } from 'express-validator';

export const signupValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('At least one lowercase letter required')
    .matches(/[A-Z]/).withMessage('At least one uppercase letter required')
    .matches(/[0-9]/).withMessage('At least one number required')
    .matches(/[^A-Za-z0-9]/).withMessage('At least one special character required'),
  body('address').optional().isString(),
  body('role').optional().isIn(['System Administrator', 'Normal User', 'Store Owner'])
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const ratingValidator = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1–5')
];

export const storeCreateValidator = [
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  body('address').optional().isString()
];

export const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  next();
};
