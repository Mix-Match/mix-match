import express from 'express';
import {
  refreshIngredients,
  getAllIngredients,
} from '../controllers/ingredientsController';

// ingredientsRoutes function - takes in pool parameter (PostgreSQL connection pool)
// Return - instance of express.Router() (handle the ingredient-related routes)
const ingredientsRoutes = (pool: any) => {
  const router = express.Router();

  // Endpoint for refreshing ingredients from the cocktail API
  router.post('/refresh', (req, res) => {
    refreshIngredients(pool, req, res);
  });

  // Endpoint for getting all ingredients from the database
  router.get('/', (req, res) => {
    getAllIngredients(pool, req, res);
  });

  // Return the router instance
  return router;
};

export default ingredientsRoutes;
