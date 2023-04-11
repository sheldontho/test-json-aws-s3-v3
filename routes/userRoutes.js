/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import express from 'express';

import { validate } from '../middleware/validateMdware.js';
import { signupRules, loginRules } from '../middleware/validateAuthMdware.js';
import * as userCtrl from '../controllers/userCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route api/user/signup
 * @access public
 * @desc Sign up user (Customer)
 */
router.post('/signup', signupRules(), validate, userCtrl.signupUser);

/**
 * @method POST
 * @route api/user/login
 * @access public
 * @desc Login user
 */
router.post('/login', loginRules(), validate, userCtrl.loginUser);

export default router;
