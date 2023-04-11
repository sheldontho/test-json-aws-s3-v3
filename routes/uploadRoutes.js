/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import express from 'express';

import { protect } from '../middleware/authMdware.js';
import { uploadImg } from '../libs/multerUpload.js';
import * as uploadCtrl from '../controllers/uploadCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route api/uploadfile/upldimg/:arg
 * @access private
 * @desc Upload image to the temp dest folder before S3 bucket uploading
 */
router
  .route('/upldimg/:arg')
  .post(protect, uploadImg.single('dfimg'), uploadCtrl.uploadTempImage);

/**
 * @method POST
 * @route api/uploadfile/test/upldimg2s3
 * @access public
 * @desc Test API - Upload temp image in the server to S3 bucket
 */
router.post('/test/upldimg2s3', uploadCtrl.testUploadImg2S3);

export default router;
