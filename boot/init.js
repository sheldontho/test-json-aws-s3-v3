/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import User from '../models/userModel.js';
import { genUsername } from '../utils/helper.js';
import { checkS3Bucket } from '../libs/checkS3Bucket.js';
import { createS3Bucket } from '../libs/createS3Bucket.js';
import { addS3BucketCorsRules } from '../libs/addS3BucketCorsRules.js';
import { addS3BucketPolicy } from '../libs/addS3BucketPolicy.js';

const initDB = async () => {
  try {
    //-- check Super Admin account
    const user = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });
    if (!user) {
      //-- create Admin
      const admin = await User.create({
        firstName: 'Sheldon',
        lastName: 'Thompson',
        username: genUsername('Sheldon', 'Thompson'),
        email: process.env.SUPER_ADMIN_EMAIL,
        password: '12345678', //-- must be changed!
        emailVerified: true, // *
        role: 'admin' // *
      });
      if (admin) {
        //-- okay
        console.log('BOOT_initDB:', 'Admin is created');
      } else {
        //-- ignore error
        console.log('BOOT_initDB_ERROR:', 'Oops, failed to create admin');
      }
    } else {
      //-- no need to create
      console.log('BOOT_initDB:', 'Yup, admin already exists');
    }
  } catch (err) {
    console.log('BOOT_initDB_ERROR:', err);
  }
};

const initS3 = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const bucket = process.env.S3_BUCKET_NAME;
      if ((await checkS3Bucket(bucket)) !== true) {
        if ((await createS3Bucket(bucket)) !== true) {
          console.log('BOOT_initS3_ERROR:', 'Failed to Create S3 Bucket');
          return;
        }
      }
      if ((await addS3BucketCorsRules(bucket)) !== true) {
        console.log(
          'BOOT_initS3_ERROR:',
          'Failed to Add CORS rules to S3 Bucket'
        );
        return;
      }
      if ((await addS3BucketPolicy(bucket)) !== true) {
        console.log('BOOT_initS3_ERROR:', 'Failed to Add Policy to S3 Bucket');
        return;
      }
      console.log('BOOT_initS3:', 'S3 Bucket is configured');
    }
  } catch (err) {
    console.log('BOOT_initS3_ERROR:', err);
  }
};

export { initDB, initS3 };
