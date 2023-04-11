/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import express from 'express';

import { validate } from '../middleware/validateMdware.js';
import { signupRules, loginRules } from '../middleware/validateAuthMdware.js';
import { protect } from '../middleware/authMdware.js';
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

/**
 * @method POST
 * @route api/user/logout
 * @access private
 * @desc Logout user by destroying token
 */
router.route('/logout').post(protect, userCtrl.logoutUser);

/**
 * @method POST
 * @route api/user/logout/strict
 * @access private
 * @desc Logout user strictly by removing all the tokens
 */
router.route('/logout/strict').post(protect, userCtrl.strictLogoutUser);

export default router;
