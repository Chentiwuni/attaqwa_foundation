const { check } = require('express-validator');
  
  // Validation Middleware for Admin Sign-Up
  exports.validateAdminSignUp = [
    check('username')
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
      .trim(),
    check('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    check('confirmPassword')
      .notEmpty().withMessage('Confirm Password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ];
  