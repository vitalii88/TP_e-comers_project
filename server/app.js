import * as dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import dbConnector from './db/dbConnector.js';
import * as middleware from './middleware/index.js'

dotenv.config();
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_DB_URL;

const app = express();

app.use(express.json());
app.use(cors());

//middleware
app.use(middleware.notFoundMiddleware);
app.use(middleware.errorHandlerMiddleware);

dbConnector(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server run on porn: ${PORT}`)
    })
  }).catch((error) => console.log(error));
