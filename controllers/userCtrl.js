/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import { genUsername } from '../utils/helper.js';

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

export { signupUser, loginUser };
