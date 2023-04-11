/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import { body } from 'express-validator';

const signupRules = () => {
  return [
    body('firstName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('First Name is required'),
    body('lastName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Last Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ];
};

const loginRules = () => {
  return [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ];
};

export { signupRules, loginRules };
