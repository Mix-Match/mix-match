import express from 'express';
import {
  refreshIngredients,
  getAllIngredients,
} from '../controllers/ingredientsController';

// ingredientsRoutes function - takes in pool parameter (PostgreSQL connection pool)
// Return - instance of express.Router() (handle the ingredient-related routes)
  const router = express.Router();

  // Endpoint for refreshing ingredients from the cocktail API
  router.post('/refresh', refreshIngredients, (req, res) => res.status(200).json({}));

  // Endpoint for getting all ingredients from the database
  router.get('/', getAllIngredients, (req, res) => res.status(200).json({}));

  // Return the router instance
export default router;
