/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import asyncHandler from 'express-async-handler';
import { GetObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '../libs/s3Client.js';
import { streamToString } from '../utils/helper.js';

const getJsonData = asyncHandler(async (req, res) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'test-pkg.json'
    };
    const s3Cmd = new GetObjectCommand(params);
    const s3Res = await s3Client.send(s3Cmd);
    const { Body } = s3Res;
    let result = await streamToString(Body);
    result = JSON.parse(result);
    //-- okay
    console.log('API_getJsonData_200:', 'okay');
    res.status(200).json(result);
  } catch (e) {
    console.log('API_getJsonData_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getJsonData };
