/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
 import { mongoose } from 'mongoose';

const userSignTokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true
    },
    tokenSetAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const UserSignToken = mongoose.model('UserSignToken', userSignTokenSchema);

export default UserSignToken;
