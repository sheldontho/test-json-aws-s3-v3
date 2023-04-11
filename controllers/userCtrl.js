/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import asyncHandler from 'express-async-handler';
const { createHmac, createHash } = await import('node:crypto');
import converter from 'number-to-words';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import UserSignToken from '../models/userSignTokenModel.js';
import {
  chkEmailVeriToken,
  genUsername,
  isValidEmailVeriTokenTTL
} from '../utils/helper.js';

const signupUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('API_signupUser_403:', 'User already exists');
      return res.status(403).json({
        msg: 'User already exists'
      });
    }

    //-- create user
    const user = await User.create({
      firstName,
      lastName,
      username: genUsername(firstName, lastName),
      email,
      password,
      // emailVerified: process.env.NODE_ENV === 'development' ? true : false, // *
      emailVerified: true, //-- for the purpose of milestone testing!!!
      role: undefined //-- Default would be applied
    });
    if (user) {
      //-- skip verify-email for local dev
      console.log('API_signupUser_200:', 'Please login to your account');
      return res.status(200).send('Please login to your account');
    } else {
      console.log('API_signupUser_400:', 'Invalid user data');
      res.status(400).json({
        msg: 'Invalid user data'
      });
    }
  } catch (e) {
    console.log('API_signupUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      if (user.emailVerified) {
        //-- okay
        const token = await user.newAuthToken();
        console.log('API_loginUser_200:', 'okay');
        res.status(200).json({ token });
      } else {
        console.log('API_loginUser_403:', 'Email is not verified yet');
        res.status(403).json({
          msg: 'Email is not verified yet'
        });
      }
    } else {
      console.log('API_loginUser_400:', 'Invalid email or password');
      res.status(400).json({
        msg: 'Invalid email or password'
      });
    }
  } catch (e) {
    console.log('API_loginUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` & `req.token` was set in [authMdware.js]
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    //-- okay
    console.log('API_logoutUser_200:', 'User has been logged out');
    res.status(200).send('User has been logged out');
  } catch (e) {
    console.log('API_logoutUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const strictLogoutUser = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    req.user.tokens = [];
    await req.user.save();
    //-- okay
    console.log(
      'API_strictLogoutUser_200:',
      'User has been strictly logged out'
    );
    res.status(200).send('User has been strictly logged out');
  } catch (e) {
    console.log('API_strictLogoutUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { signupUser, loginUser, logoutUser, strictLogoutUser };
