import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import router from './routes/api';
import authRoutes from './routes/authRoutes';
import ingredientsRoutes from './routes/ingredientRoutes';
import { getDrinksByLiquor, getInstructionsById } from './controllers/drinksController';
// import axios from 'axios';
// import path from 'path';

require('dotenv').config();

// Create Express application
const app = express();

// Set the port number from environment variables or use a default value
const port = process.env.PORT || 5001;

// Set the PostgreSQL connection string from environment variables
const pool = new Pool({
  connectionString: process.env.PG_URI,
});

pool.connect((err) => {
  // Log an error if failed to connect to the database
  if (err) return console.error('Error acquiring client', err.stack);
  // Log a success message if connected to the database
  console.log('Connected to the database.'); // Parse JSON request bodies
});

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json()); // Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// define route handlers
app.use('/api', router);

app.use('/api/ingredients', ingredientsRoutes(pool));
app.use('/api/auth', authRoutes(pool));

// Catch-all error handler

// Global error handler:
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown router error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
