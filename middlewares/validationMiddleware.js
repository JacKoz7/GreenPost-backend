// walidacja danych po stronie serwera
const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('Username')
    .isLength({ min: 3, max: 15 })
    .withMessage('Username must be between 3 and 15 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Username must be alphanumeric'),
  body('Password')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password must be between 6 and 15 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/)
    .withMessage('Password must contain at least one letter and one number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegistration };