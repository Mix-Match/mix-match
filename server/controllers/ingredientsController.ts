import axios from 'axios';
import { Request, Response } from 'express';
import { pool } from '../server';

const cocktailDB = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILDB_APIKEY}/list.php?`;

// Endpoint for refreshing ingredients
export const refreshIngredients = async (
  req: Request,
  res: Response
) => {
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
      await pool.query(
        'INSERT INTO ingredients (name) VALUES ($1) ON CONFLICT DO NOTHING',
        [name]
      );
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
};

// Retrieve all ingredients from the database
export const getAllIngredients = async (
  req: Request,
  res: Response
) => {
  try {
    // SQL query to select all ingredient names from database
    const result = await pool.query('SELECT name FROM ingredients');
    // Extract ingredient names from query result
    const ingredients = result.rows.map((row) => row.name);
    // Send ingredient names as a JSON response with a status code of 200 (OK)
    res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
