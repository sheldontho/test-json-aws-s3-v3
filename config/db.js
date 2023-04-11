/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import { mongoose } from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    const { host, port } = conn.connection;
    console.log(
      'CONFIG_connectDB:',
      `MongoDB is connected with ${host}:${port}`
    );
  } catch (err) {
    console.log('CONFIG_connectDB_ERROR:', err);
    process.exit(1);
  }
};

export default connectDB;
