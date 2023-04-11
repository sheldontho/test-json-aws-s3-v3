/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
 import { mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { randomBytes, createHash } = await import('node:crypto');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer'
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    pwdChangedAt: Date,
    pwdResetToken: String,
    pwdResetExpiresAt: Date
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  try {
    let user = this;
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    next(e);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    let user = this;
    return await bcrypt.compare(enteredPassword, user.password);
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    return false;
  }
};

userSchema.methods.createPwdResetToken = function () {
  try {
    let user = this;
    const resetToken = randomBytes(32).toString('hex');
    user.pwdResetToken = createHash('sha256').update(resetToken).digest('hex');
    const ttl = 1000 * 60 * 60; // 1 hour = 60 mins
    user.pwdResetExpiresAt = Date.now() + ttl;
    return resetToken;
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    return null;
  }
};

userSchema.methods.newAuthToken = async function () {
  try {
    let user = this;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '12h'
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    return null;
  }
};

const User = mongoose.model('User', userSchema);

export default User;
