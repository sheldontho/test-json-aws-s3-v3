/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION;

const s3Client = new S3Client({ region });

export { s3Client };
