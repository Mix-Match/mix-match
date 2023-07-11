import { getDrinksByLiquor, getInstructionsById } from './controllers/drinksController';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { Pool } = require('pg');

// Create Express application
const app = express();

// Set the port number from environment variables or use a default value
const port = process.env.PORT || 5001;

// const apiRouter = require('./routes/api');
// const Item = require('./models/itemModel.js');

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
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// Route for fetching to cocktail API, return array of objects with cocktails
app.get('/api/getdrinks/:liquor', getDrinksByLiquor);

// Route for fetching to cocktail API with the cocktail ID, returns recipe and more information on that specific cocktail
app.get('/api/getinstructions/:id', getInstructionsById);

const cocktailDB = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILDB_APIKEY}/list.php?`;

// Endpoint for refreshing ingredients
app.post('/refresh-ingredients', async (req, res) => {
  try {
    // Make a GET request to fetch the list of ingredients from the cocktail API
    const response = await axios.get(`${cocktailDB}i=list`);
    // Extract the ingredients from the response data
    const ingredients = response.data.drinks;
    // Use a transaction to make sure all ingredients are inserted atomically
    await pool.query('BEGIN');
    for (let ingredient of ingredients) {
      let name = ingredient.strIngredient1;
      // Insert each ingredient into the database, ignoring duplicates
      await pool.query('INSERT INTO ingredients (name) VALUES ($1) ON CONFLICT DO NOTHING', [name]);
    }
    // Commit the transaction (permanently save the changes made within the transaction to the database)
    await pool.query('COMMIT');
    res.status(200).json({ message: 'Ingredients refreshed!' }); // Send a success response
  } catch (error) {
    // Roll back the transaction in case of errors
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' }); // Send an error response
    }
  });

// Catch-all error handler IF WE HAD ONE!

// Global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown router error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});