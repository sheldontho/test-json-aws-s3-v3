/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import express from 'express';

import * as testJsonCtrl from '../controllers/testJsonCtrl.js';

const router = express.Router();

/**
 * @method GET
 * @route api/testjson/getdata
 * @access public
 * @desc Get JSON data from S3 bucket
 */
router.get('/getdata', testJsonCtrl.getJsonData);

export default router;
