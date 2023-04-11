/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';

import connectDB from './config/db.js';
import { initDB, initS3 } from './boot/init.js';
import userRoutes from './routes/userRoutes.js';
import testJsonRoutes from './routes/testJsonRoutes.js';
import { errorHandler, notFound } from './middleware/errorMdware.js';

const __dirname = path.resolve();

dotenv.config();
if (process.env.NODE_ENV === undefined || !process.env.NODE_ENV) {
  //-- Environment 4 development
  dotenv.config({ path: path.join(__dirname, '/environments/.env') });
}

//// Bootstrapping
connectDB();
initDB();
initS3();

const app = express();
const PORT = process.env.PORT || 5180;

//// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//-- cors origin
app.use(
  cors({
    origin: [
      `http://localhost:${PORT}`,
      `http://localhost:${process.env.PORT_REACT}`,
      `http://${process.env.SERVER_IP}`,
      `https://${process.env.SERVER_IP}`,
      `http://${process.env.SERVER_DOMAIN}`,
      `https://${process.env.SERVER_DOMAIN}`
    ]
  })
);
//-- mongo sanitize
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.log(`Request[${key}] is sanitized:`, req);
    }
  })
);

//// REST API routes
app.use('/api/user', userRoutes);
app.use('/api/testjson', testJsonRoutes);

//// Middleware for error handling
app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  )
);
