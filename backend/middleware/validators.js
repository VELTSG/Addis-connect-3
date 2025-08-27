const { body } = require('express-validator');

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password required'),
];

exports.signupValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password required'),
];

exports.createUserValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password required'),
  body('role').optional().isIn(['admin', 'editor', 'superadmin', 'user']).withMessage('Invalid role'),
];
